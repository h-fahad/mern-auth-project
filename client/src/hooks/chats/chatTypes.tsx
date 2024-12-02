export type UserProps = {
    name: string;
    username: string;
    avatar: string;
    online: boolean;
  };
  
  export type MessageProps = {
    _id: string;
    content: string;
    timestamp: string;
    unread?: boolean;
    sender: UserProps | 'You';
    attachment?: {
      fileName: string;
      type: string;
      size: string;
    };
  };
  
  export type ChatProps = {
    _id: string;
    recipientUser: UserProps;
    messages: MessageProps[];
  };
  