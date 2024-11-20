import * as React from 'react';
import Sheet from '@mui/joy/Sheet';

import MessagesPane from './MessagesPane.tsx';
import ChatsPane from './ChatsPane.tsx';
// import { ChatProps } from '../../hooks/chats/chatTypes.tsx';
// import { chats } from '../../hooks/chats/data.tsx'
import AuthContext from '../../context/AuthContext.js';
import { findUserChats } from '../../utils/chatService.js';

export default function MyProfile() {
    const [selectedChat, setSelectedChat] = React.useState();
    const [chats, setChats] = React.useState();
    const { userData } = React.useContext(AuthContext); // Check authentication state

    React.useEffect(() => {

        const fetchChats = async () => {
            const userChats = await findUserChats(userData?._id);
            setChats(userChats)
            console.log(userChats);
        }
        if (userData?._id) {
            console.log(userData);
            fetchChats();
        }
    }, [userData])
    return (
        <Sheet
            sx={{
                flex: 1,
                width: '100%',
                mx: 'auto',
                pt: { xs: 'var(--Header-height)', md: 0 },
                display: 'grid',
                gridTemplateColumns: {
                    xs: '1fr',
                    sm: 'minmax(min-content, min(30%, 400px)) 1fr',
                },
            }}
        >
            <Sheet
                sx={{
                    position: { xs: 'fixed', sm: 'sticky' },
                    transform: {
                        xs: 'translateX(calc(100% * (var(--MessagesPane-slideIn, 0) - 1)))',
                        sm: 'none',
                    },
                    transition: 'transform 0.4s, width 0.4s',
                    zIndex: 100,
                    width: '100%',
                    top: 52,
                }}
            >
                <ChatsPane
                    chats={chats}
                    selectedChatId={selectedChat?._id}
                    setSelectedChat={setSelectedChat}
                />
            </Sheet>
            <MessagesPane chat={selectedChat} />
        </Sheet>
    );
}
