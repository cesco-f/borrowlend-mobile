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

const fetchWrapper = async <T>(url: string, options: RequestInit = {}) => {
  // Request interceptor
  console.log('Starting Request', {url, options});

  try {
    const response = await fetch(url, options);

    // Response interceptor
    if (!response.ok) {
      // Handle errors here
      const error = await response.json();
      console.error('Error Response:', error);
      throw new Error(error.message || 'Something went wrong');
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    console.error('Fetch Error:', error);
    throw error;
  }
};

const postRequest = <T>(url: string, body: Record<string, unknown>) => {
  return fetchWrapper<T>(url, {
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
  return fetchWrapper<BLItem[]>(
    `${API_BASE_URL}/books?q=${searchTerm
      .toLowerCase()
      .replace(' ', '+')}&language=${language}`,
  );
};

export const fetchUsers = async ({searchTerm}: {searchTerm: string}) => {
  if (!searchTerm) {
    return [];
  }

  return fetchWrapper<User[]>(
    `${API_BASE_URL}/users?q=${searchTerm.split(' ')[0].toLowerCase()}`,
  );
};

export const fetchUserById = async (userId: string) => {
  return fetchWrapper<CompleteUser>(`${API_BASE_URL}/users/${userId}`);
};

export const fetchReceivedFriendRequests = async (userId: string) => {
  return fetchWrapper<CompleteFriendRequest[]>(
    `${API_BASE_URL}/users/${userId}/receivedFriendRequests`,
  );
};

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return postRequest<User>(`${API_BASE_URL}/login`, {
    email,
    password,
  });
};

export const sendFriendRequest = async ({
  userId,
  friendId,
}: {
  userId: string;
  friendId: string;
}) => {
  return postRequest<FriendRequest>(`${API_BASE_URL}/friendRequests`, {
    userId,
    friendId,
  });
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
  return postRequest<FriendRequest>(
    `${API_BASE_URL}/friendRequests/${friendRequestId}`,
    {
      userId,
      isAccepted,
    },
  );
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
  return fetchWrapper(`${API_BASE_URL}/users/${userId}/friends/${friendId}`, {
    method: 'DELETE',
  });
};

export const addUserItem = async (userId: string, item: BLItem) => {
  return postRequest<BLItem>(`${API_BASE_URL}/items`, {
    userId,
    ...item,
  });
};

export const queryItems = async (
  userId: string,
  query: 'friends' | 'location',
) => {
  return postRequest<BLItem>(`${API_BASE_URL}/userItems`, {
    userId,
    query,
  });
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
