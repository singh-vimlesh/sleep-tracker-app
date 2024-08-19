import React from 'react';
import { User } from '../types';

type UserTableProps = {
    users: User[];
    onRowClick: (user: User) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onRowClick }) => {
    return (
        <table className="min-w-full bg-white">
            <thead>
                <tr>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2">Gender</th>
                    <th className="px-4 py-2">Submissions</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={user.id} onClick={() => onRowClick(user)} className="cursor-pointer">
                        <td className="border px-4 py-2 capitalize">{user.name}</td>
                        <td className="border px-4 py-2">{user.email}</td>
                        <td className="border px-4 py-2 capitalize">{user.gender}</td>
                        <td className="border px-4 py-2 text-right">{user.submissions}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default UserTable;
