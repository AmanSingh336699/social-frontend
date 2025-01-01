
function MessageBubble({ message, isOwn }) {
  return (
    <div className={`flex ${isOwn && 'justify-end'}`}>
        <div className={`p-4 rounded-lg max-w-xs ${
            isOwn ? 'bg-sky-500 text-white' : 'bg-gray-200 text-black'
        }`}>
            {message.text}
        </div>
    </div>
  )
}

export default MessageBubble