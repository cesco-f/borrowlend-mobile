import {
  BLItem,
  CompleteFriendRequest,
  CompleteUser,
  FriendRequest,
  SearchBooks,
  User,
} from './types';

export const API_BASE_URL =
  'https://s7zb7mc40b.execute-api.eu-central-1.amazonaws.com/dev/v1';

const postRequest = (url: string, body: Record<string, unknown>) => {
  return fetch(url, {
    body: JSON.stringify(body),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const fetchBooks = async ({searchTerm, language}: SearchBooks) => {
  if (!searchTerm) {
    return [];
  }
  const response = await fetch(
    `${API_BASE_URL}/books?q=${searchTerm
      .toLowerCase()
      .replace(' ', '+')}&language=${language}`,
  );

  return response.json() as Promise<BLItem[]>;
};

export const fetchUsers = async ({searchTerm}: {searchTerm: string}) => {
  if (!searchTerm) {
    return [];
  }

  const response = await fetch(
    `${API_BASE_URL}/users?q=${searchTerm.split(' ')[0].toLowerCase()}`,
  );

  return response.json() as Promise<User[]>;
};

export const fetchUserById = async (userId: string) => {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`);

  return response.json() as Promise<CompleteUser>;
};

export const fetchReceivedFriendRequests = async (userId: string) => {
  const response = await fetch(
    `${API_BASE_URL}/users/${userId}/receivedFriendRequests`,
  );

  return response.json() as Promise<CompleteFriendRequest[]>;
};

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response = await postRequest(`${API_BASE_URL}/login`, {
    email,
    password,
  });

  return response.json() as Promise<User>;
};

export const sendFriendRequest = async ({
  userId,
  friendId,
}: {
  userId: string;
  friendId: string;
}) => {
  const response = await postRequest(`${API_BASE_URL}/friendRequests`, {
    userId,
    friendId,
  });

  return response.json() as Promise<FriendRequest>;
};

const replyToFriendRequest = async (
  friendRequestId: string,
  {
    userId,
    isAccepted,
  }: {
    userId: string;
    isAccepted: boolean;
  },
) => {
  const response = await postRequest(
    `${API_BASE_URL}/friendRequests/${friendRequestId}`,
    {
      userId,
      isAccepted,
    },
  );

  return response.json() as Promise<FriendRequest>;
};

export const acceptFriendRequest = ({
  userId,
  friendRequestId,
}: {
  userId: string;
  friendRequestId: string;
}) => {
  return replyToFriendRequest(friendRequestId, {userId, isAccepted: true});
};

export const refuseFriendRequest = ({
  userId,
  friendRequestId,
}: {
  userId: string;
  friendRequestId: string;
}) => {
  return replyToFriendRequest(friendRequestId, {userId, isAccepted: false});
};

export const deleteFriend = ({
  userId,
  friendId,
}: {
  userId: string;
  friendId: string;
}) => {
  return fetch(`${API_BASE_URL}/users/${userId}/friends/${friendId}`, {
    method: 'DELETE',
  });
};

export const addUserItem = async (userId: string, item: BLItem) => {
  const response = await postRequest(`${API_BASE_URL}/items`, {
    userId,
    ...item,
  });

  return response.json() as Promise<BLItem>;
};

export const queryItems = async (
  userId: string,
  query: 'friends' | 'location',
) => {
  const response = await postRequest(`${API_BASE_URL}/userItems`, {
    userId,
    query,
  });

  return response.json() as Promise<BLItem>;
};

export const deleteUserItem = ({
  userId,
  itemId,
}: {
  userId: string;
  itemId: string;
}) => {
  return fetch(`${API_BASE_URL}/users/${userId}/items/${itemId}`, {
    method: 'DELETE',
  });
};
