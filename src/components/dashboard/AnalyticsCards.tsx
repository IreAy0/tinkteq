import { CalendarIcon, CheckCircleIcon, TruckIcon, XCircleIcon } from 'lucide-react';
import { useState } from 'react';
import { Input } from '../ui/input';

interface DataItem {
  date: string;
  status: string;
  value: number;
}

interface AnalyticsCardProps {
  data: DataItem[];
}

export default function AnalyticsCard({ data }: AnalyticsCardProps) {
  const [filter, setFilter] = useState('today');
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  const filteredData = data.filter(item => {
    const itemDate = new Date(item.date);
    if (filter === 'today') {
      const today = new Date().toISOString().split('T')[0];
      return item.date === today;
    } else if (filter === 'range') {
      return startDate && endDate && itemDate >= startDate && itemDate <= endDate;
    }
    return true;
  });
  const totalShipment = filteredData.length;
  const totalFulfilled = filteredData.filter(item => item.status === 'delivered').length;
  const totalFailed = filteredData.filter(item => item.status === 'failed').length;
  const amount = filteredData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Analytics</h2>
        <select
          className="border rounded p-2"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="today">Today</option>
          <option value="all">All Time</option>
          <option value="range">Date Range</option>
        </select>
      </div>
      {filter === 'range' && (
         <div className="my-4 flex flex-row flex-wrap space-y-2 lg:flex-nowrap justify-between md:space-x-4 items-center">
         <div className="md:ml-auto flex flex-row space-x-3">
         <Input
           type="date"
           value={startDate ? startDate.toISOString().split('T')[0] : ''}
           onChange={(e) => setStartDate(e.target.value ? new Date(e.target.value) : null)}
           className="border p-2 rounded "
         />
         <Input
           type="date"
           value={endDate ? endDate.toISOString().split('T')[0] : ''}
           onChange={(e) => setEndDate(e.target.value ? new Date(e.target.value) : null)}
           className="border p-2 rounded"
         />
         </div>
        
       </div>
      )}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="flex items-center p-4 bg-blue-100 rounded-lg">
          <CalendarIcon className="h-6 w-6 text-blue-500" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">{filter == 'today' ? "Todays Amount" : "Total Amount"}</p>
            <p className="text-lg font-bold text-gray-900">${amount}</p>
          </div>
        </div>
        <div className="flex items-center p-4 bg-green-100 rounded-lg">
          <TruckIcon className="h-6 w-6 text-green-500" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">{filter == 'today' ? "Todays Shipments" : "Total Shipments"}</p>
            <p className="text-lg font-bold text-gray-900">{totalShipment}</p>
          </div>
        </div>
        <div className="flex items-center p-4 bg-yellow-100 rounded-lg">
          <CheckCircleIcon className="h-6 w-6 text-yellow-500" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">{filter == 'today' ? "Todays Total Delivered" : "Total Delivered"}</p>
            <p className="text-lg font-bold text-gray-900">{totalFulfilled}</p>
          </div>
        </div>
        <div className="flex items-center p-4 bg-red-100 rounded-lg">
          <XCircleIcon className="h-6 w-6 text-red-500" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">{filter == 'today' ? "Todays Total Failed" : "Total Failed"}</p>
            <p className="text-lg font-bold text-gray-900">{totalFailed}</p>
          </div>
        </div>
      </div>
    </div>
  );
}