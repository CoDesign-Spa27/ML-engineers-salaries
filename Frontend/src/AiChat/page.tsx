import Chat from './Chat'

function ChatAi() {
  return (
    <div className='flex flex-col w-full mx-auto min-h-screen bg-neutral-950 p-4'>
       
      <div className='text-4xl pt-10 text-center text-gray-200 font-black uppercase '>
        Presenting AI for your Data insights
      
      </div>
      <p className='text-md text-center pt-5 text-neutral-400'>
            Feel free to ask any questions about the data you see on the page and get instant answers from our AI model.
        </p>
      <div>
        <Chat />
      </div>
    </div>
  )
}

export default ChatAi
