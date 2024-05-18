const Modal = ({ isOpen, onClose, messages }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 w-96 flex flex-col items-center">
                <h2 className="text-xl font-semibold mb-4 text-center">Error</h2>
                {messages.map((message, index) => (
                    <p key={index} className="text-center">{message}</p>
                ))}
                <div className="mt-4">
                    <button
                        className="bg-my-purple hover:bg-my-purple-light py-2 px-4 rounded-large"
                        onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
