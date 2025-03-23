'use client';

import {useState, useRef, useEffect, memo} from 'react';
import QueryBuilder from '@/app/components/QueryBuilder';

interface ChatInputProps {
    onSendMessage: (message: string) => void;
    isDisabled?: boolean;
}

/**
 * Composant de saisie de message pour le chatbot
 * Mémorisé pour éviter des rendus inutiles
 */
const ChatInput = memo(function ChatInput({onSendMessage, isDisabled = false}: ChatInputProps) {
    const [message, setMessage] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    // Focus sur l'input au chargement du composant et quand il n'est plus désactivé
    useEffect(() => {
        if (!isDisabled) {
            inputRef.current?.focus();
        }
    }, [isDisabled]);

    /**
     * Gère la soumission du formulaire
     * @param e Événement de soumission du formulaire
     */
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim() && !isDisabled) {
            onSendMessage(message);
            setMessage('');
        }
    };

    /**
     * Gère les raccourcis clavier
     * @param e Événement clavier
     */
    const handleKeyDown = (e: React.KeyboardEvent) => {
        // Envoyer le message avec Ctrl+Enter ou Cmd+Enter
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            if (message.trim() && !isDisabled) {
                onSendMessage(message);
                setMessage('');
            }
        }
    };

    return (
        <div className="flex flex-row items-center gap-4">
            <QueryBuilder setMessage={setMessage} />
            <form onSubmit={handleSubmit} className="w-full max-w-3xl">
                <div className="relative flex items-center">
                    <input
                        ref={inputRef}
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Tapez votre message..."
                        disabled={isDisabled}
                        aria-label="Message à envoyer"
                        className="w-full p-4 pr-12 rounded-lg text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-400 shadow-sm transition-all duration-200"
                    />
                    <button
                        type="submit"
                        disabled={!message.trim() || isDisabled}
                        aria-label="Envoyer le message"
                        className="absolute right-3 p-2 text-white bg-indigo-600 rounded-full hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-5 h-5"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                            />
                        </svg>
                    </button>
                </div>
            </form>
        </div>
    );
});

// Nom d'affichage pour les outils de développement
ChatInput.displayName = 'ChatInput';

export default ChatInput; 