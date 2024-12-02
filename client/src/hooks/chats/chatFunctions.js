import { useEffect, useState } from "react";
import { getUsers } from "../../utils/userService";

export function openSidebar() {
  if (typeof window !== "undefined") {
    document.body.style.overflow = "hidden";
    document.documentElement.style.setProperty("--SideNavigation-slideIn", "1");
  }
}

export function closeSidebar() {
  if (typeof window !== "undefined") {
    document.documentElement.style.removeProperty("--SideNavigation-slideIn");
    document.body.style.removeProperty("overflow");
  }
}

export function toggleSidebar() {
  if (typeof window !== "undefined" && typeof document !== "undefined") {
    const slideIn = window
      .getComputedStyle(document.documentElement)
      .getPropertyValue("--SideNavigation-slideIn");
    if (slideIn) {
      closeSidebar();
    } else {
      openSidebar();
    }
  }
}

export function openMessagesPane() {
  if (typeof window !== "undefined") {
    document.body.style.overflow = "hidden";
    document.documentElement.style.setProperty("--MessagesPane-slideIn", "1");
  }
}

export function closeMessagesPane() {
  if (typeof window !== "undefined") {
    document.documentElement.style.removeProperty("--MessagesPane-slideIn");
    document.body.style.removeProperty("overflow");
  }
}

export function toggleMessagesPane() {
  if (typeof window !== "undefined" && typeof document !== "undefined") {
    const slideIn = window
      .getComputedStyle(document.documentElement)
      .getPropertyValue("--MessagesPane-slideIn");
    if (slideIn) {
      closeMessagesPane();
    } else {
      openMessagesPane();
    }
  }
}

export const useFetchRecipientUser = (members, user) => {
  const [recipientUser, setRecipientUser] = useState(null);
  const [error, setError] = useState(null);
  const recipient = members.find((member) => member !== user._id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(recipient, "ressssss");
        const response = await getUsers(recipient);
        console.log(response, "dataaaaaa");

        if (!response) {
          throw new Error("Failed to fetch recipient user");
        }
        setRecipientUser(response);
      } catch (err) {
        setError(err);
      }
    };
    fetchData();
  }, [recipient]);

  return { recipientUser };
};
