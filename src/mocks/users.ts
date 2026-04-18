export interface MockUser {
    id: number;
    name: string;
}

export const MOCK_USERS: Record<number, MockUser> = {
    1: { id: 1, name: "Alice" },
    2: { id: 2, name: "Bob" },
    3: { id: 3, name: "Sara" },
    4: { id: 4, name: "Dan" },
};
