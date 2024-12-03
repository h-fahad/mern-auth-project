import * as React from 'react';
import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import MessageInput from './MessageInput.tsx';
import MessagesPaneHeader from './MessagesPaneHeader.tsx';
import ChatBubble from './ChatBubble.tsx';
import AvatarWithStatus from './AvatarWithStatus.tsx';
import { MessageProps } from '../../hooks/chats/chatTypes';
import { getChatMessagesById } from '../../utils/chatService.js';

export default function MessagesPane(props) {
  const { chat, userData } = props;
  const [chatMessages, setChatMessages] = React.useState([{
    senderId: "",
    text: ""
  }]);
  const [textAreaValue, setTextAreaValue] = React.useState('');

  React.useEffect(() => {
    const fetchChats = async () => {
      const messages = await getChatMessagesById(chat?._id);
      console.log(messages, "messages");
      setChatMessages(messages)
    }
    if (chat?._id) {
      fetchChats();
    }
  }, [chat]);

  return (
    <Sheet
      sx={{
        height: { xs: 'calc(100dvh - var(--Header-height))', md: '100dvh' },
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'background.level1',
      }}
    >
      <MessagesPaneHeader sender={chat?.recipientUser} />
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          minHeight: 0,
          px: 2,
          py: 3,
          overflowY: 'scroll',
          flexDirection: 'column-reverse',
        }}
      >
        <Stack spacing={2} sx={{ justifyContent: 'flex-end' }}>
          {chatMessages?.map((message: any, index: number) => {
            const isYou = message?.senderId === userData?._id;
            return (
              <Stack
                key={index}
                direction="row"
                spacing={2}
                sx={{ flexDirection: isYou ? 'row-reverse' : 'row' }}
              >
                {message?.senderId !== userData?._id && (
                  <AvatarWithStatus
                    online={message?.sender?.online}
                    src={message?.sender?.avatar}
                  />
                )}
                <ChatBubble variant={isYou ? 'sent' : 'received'} sender={chat?.recipientUser} {...message} />
              </Stack>
            );
          })}
        </Stack>
      </Box>
      <MessageInput
        textAreaValue={textAreaValue}
        setTextAreaValue={setTextAreaValue}
        onSubmit={() => {
          const newId = chatMessages?.length + 1;
          const newIdString = newId.toString();
          setChatMessages([
            ...chatMessages,
            {
              _id: newIdString,
              sender: userData?._id,
              content: textAreaValue,
              timestamp: 'Just now',
            },
          ]);
        }}
      />
    </Sheet>
  );
}
