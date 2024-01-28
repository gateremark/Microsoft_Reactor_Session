"use client";

import { useChat } from "ai/react";
import { useEffect, useState } from "react";

export default function Chat() {
    const { messages, input, handleInputChange, handleSubmit } = useChat();
    const [chats, setChats] = useState([]);

    const mongoFetch = async () => {
        const response = await fetch("/api/chat/fetchChats", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        console.log("data: ", data);
        setChats(data);
    };

    useEffect(() => {
        mongoFetch();
    }, []);

    useEffect(() => {
        console.log("chats: ", chats);
    }, [chats]);

    const mongoSubmit = async () => {
        const response = await fetch("/api/chat/sendChats", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: "email.com", messages }),
        });
        const data = await response.json();
        console.log(data);
    };

    const submitChats = async (e) => {
        e.preventDefault();
        handleSubmit(e);
        await mongoSubmit();
    };

    return (
        <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
            {chats.map((c) => (
                <div key={c._id} className="whitespace-pre-wrap">
                    {c.messages.map((m) => (
                        <div key={m.id} className="whitespace-pre-wrap">
                            {m.role === "user" ? "User: " : "AI: "}
                            {m.content}
                        </div>
                    ))}
                </div>
            ))}

            {messages.map((m) => (
                <div key={m.id} className="whitespace-pre-wrap">
                    {m.role === "user" ? "User: " : "AI: "}
                    {m.content}
                </div>
            ))}

            <form onSubmit={submitChats}>
                <input
                    className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
                    value={input}
                    placeholder="Say something..."
                    onChange={handleInputChange}
                />
            </form>
        </div>
    );
}
