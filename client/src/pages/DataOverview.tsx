import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import UserTable from '../components/UserTable';
import SleepChart from '../components/SleepChart';
import { fetchUsers, fetchSleepData } from '../api/index';
import { User } from '../types';

const DataOverview: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const { data: users, isLoading: usersLoading, error: usersError } = useQuery(['users'], fetchUsers);

  const { data: sleepData, isLoading: sleepLoading, error: sleepError } = useQuery(
    ['sleepData', selectedUser],
    () => fetchSleepData(selectedUser?.id || ''),
    { enabled: !!selectedUser }
  );

  const handleRowClick = (selectedUser: User) => {
    setSelectedUser(selectedUser);
  };

  if (usersLoading) return <div>Loading users...</div>;
  if (usersError) return <div>Error loading users</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">User Data Overview</h1>
      <UserTable users={users || []} onRowClick={handleRowClick} />

      {selectedUser && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Sleep Data for <span className='capitalize'>{selectedUser.name}</span></h2>
          {sleepLoading ? (
            <div>Loading sleep data...</div>
          ) : sleepError ? (
            <div>Error loading sleep data</div>
          ) : (
            <SleepChart data={sleepData || []} />
          )}
        </div>
      )}
    </div>
  );
};

export default DataOverview;

