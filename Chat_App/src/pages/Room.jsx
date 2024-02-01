import React ,{ useState ,useEffect } from 'react'
import { databases ,database_ID , collection_ID } from '../appwriteConfig'
import { ID , Query ,Role ,Permission } from 'appwrite'
import conf from '../conf';
import { Trash2 } from  'react-feather'
import  client  from '../appwriteConfig'
import Header from '../components/Header';
import { useAuth } from '../utils/AuthContext';


function Room() {
    const { user } = useAuth();
    const [messages , setMessages] = useState([]) ; 
    const [messageBody , setMessageBody] = useState('') ; 
    useEffect(() => {
           getMessages() ;

           const unsubscribe = client.subscribe(`databases.${database_ID}.collections.${collection_ID}.documents`, response => {
            
            if(response.events.includes("databases.*.collections.*.documents.*.create")){
              console.log("A MESSAGE WAS CREATED");
              setMessages( prev => [ response.payload , ...prev ])
            }

            if(response.events.includes("databases.*.collections.*.documents.*.delete")){
              console.log("A MESSAGE WAS DELETED!!");
              setMessages(prev => prev.filter(message => message.$id !== response.payload.$id))
            }

        });

        return () => {
             unsubscribe() ; 
        }
    } ,[])

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        let payload = {
              user_id:user.$id,
              username: user.name,
              body: messageBody
        }
        let permissions = [
             Permission.write(Role.user(user.$id))
        ];

        let response = await databases.createDocument(database_ID
             ,collection_ID
             , ID.unique() 
             , payload 
             , permissions
             )
          console.log(response);    
        setMessageBody('');
    }

   const getMessages = async () => {
    
    const response = await databases.listDocuments(database_ID 
        ,collection_ID 
        ,[
            Query.orderDesc('$createdAt') ,
            Query.limit(20)
    ])
    setMessages(response.documents)
    }

    const deleteMessage =async (message_id) => {
         await databases.deleteDocument(database_ID , collection_ID ,message_id) ;
        //  setMessages(prev => prev.filter(message => message.$id !== message_id))
    }

  return (
    <main className='container'>
      <Header/>
     <div className="room--container">
        
        <form onSubmit={handleSubmit} id="message--form">
            <div className="">
                <textarea
                  required 
                  maxLength='500'
                  placeholder="Say something..."
                  onChange={(e) => setMessageBody(e.target.value)}
                  value={messageBody}
                  className='textArea'
                >
                </textarea>
            </div>
            <div className='send-btn--wrapper'>
                <input className='btn btn--secondary' type="submit" value="Send"/>
            </div>
        </form>
       <div>
           <div className="container">
              {
                 messages.map((message) => (

                    <div key={message.$id}
                    className="message--wrapper"
                    >
                        <div className="message--header">

                            <p>
                                {message?.username ? (<span>{message.username}</span>) 
                                : (<span>Anonymous user</span>) 
                                 }
                                 <small className='message-timestamp'>
                            {new Date(message.$createdAt).toLocaleString()}
                            </small>
                            </p>
                            
                            {message.$permissions.includes(`delete(\"user:${user.$id}\")`) && 
                            
                            <Trash2 
                            className='delete--btn'
                            onClick={() => deleteMessage(message.$id)}/>
                                }
                            
                        </div>
                        
                        <div className="message--body">
                            <span>{message.body}</span>
                        </div>
                    </div>
                ))
            }
             </div>
           </div>
       </div>
    </main>
  )
}

export default Room