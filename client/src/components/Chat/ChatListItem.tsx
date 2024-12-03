import * as React from 'react';
import Box from '@mui/joy/Box';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { ListItemButtonProps } from '@mui/joy/ListItemButton';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import CircleIcon from '@mui/icons-material/Circle';
import AvatarWithStatus from './AvatarWithStatus.tsx';
import { toggleMessagesPane, useFetchRecipientUser } from '../../hooks/chats/chatFunctions';
import { ChatProps, UserProps } from '../../hooks/chats/chatTypes';

type ChatListItemProps = ListItemButtonProps & {
  _id: string;
  unread?: boolean;
  recipientUser: UserProps;
  selectedChatId?: string;
  setSelectedChat: (chat: ChatProps) => void;
  members: UserProps[]; // Added members prop for group chats  (optional)
  userData: { _id: string };
};

export default function ChatListItem(props: ChatListItemProps) {
  const { _id, selectedChatId, setSelectedChat, members, userData } = props;
  const { recipientUser = { username: "", online: false, avatar: "" } } = useFetchRecipientUser(members, userData)

  const selected = selectedChatId === _id;
  return (
    <React.Fragment>
      <ListItem>
        <ListItemButton
          onClick={() => {
            toggleMessagesPane();
            setSelectedChat({ _id, recipientUser });
          }}
          selected={selected}
          color="neutral"
          sx={{ flexDirection: 'column', alignItems: 'initial', gap: 1 }}
        >
          <Stack direction="row" spacing={1.5}>
            <AvatarWithStatus online={recipientUser?.online} src={recipientUser?.avatar} />
            <Box sx={{ flex: 1 }}>
              <Typography level="title-sm">{recipientUser?.username || ''}</Typography>
              <Typography level="body-sm">{"text Message"}</Typography>
            </Box>
            <Box sx={{ lineHeight: 1.5, textAlign: 'right' }}>
              {/* {messages[0]?.unread && ( */}
              <CircleIcon sx={{ fontSize: 12 }} color="primary" />
              {/* )} */}
              <Typography
                level="body-xs"
                noWrap
                sx={{ display: { xs: 'none', md: 'block' } }}
              >
                5 mins ago
              </Typography>
            </Box>
          </Stack>
          <Typography
            level="body-sm"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {/* {messages[0]?.content} */}
          </Typography>
        </ListItemButton>
      </ListItem>
      <ListDivider sx={{ margin: 0 }} />
    </React.Fragment>
  );
}
