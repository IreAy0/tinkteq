import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Pie } from "react-chartjs-2";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AnalyticsCard from "./AnalyticsCards";
import { parseISO,  format, isWithinInterval } from "date-fns";
import Map from "./Map";
import { Input } from "../ui/input";
import generateShipmentData from "@/lib/generateData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);


const Main: React.FC = () => {
  const [filter, setFilter] = useState<string>("all");
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: "2023-01-01",
    end: "2025-12-31",
  });
  const [shipmentData] = useState(generateShipmentData(2023, 2025));

  const filteredData = shipmentData.filter(
    (item) =>
      (filter === "all" || item.status === filter) &&
      isWithinInterval(parseISO(item.date), {
        start: parseISO(dateRange.start),
        end: parseISO(dateRange.end),
      })
  );

  const monthlyShipments: { [key: string]: number } = {};
  filteredData.forEach((shipment) => {
    const month = format(parseISO(shipment.date), "yyyy-MM");
    monthlyShipments[month] = (monthlyShipments[month] || 0) + 1;
  });

  const statusColors = {
    delivered: "#10B981", 
    failed: "#EF4444", 
    pending: "#F59E0B",
  };
  const statusCounts = shipmentData.reduce(
    (acc, shipment) => {
      acc[shipment.status] = (acc[shipment.status] || 0) + 1;
      return acc;
    },
    {} as { [key: string]: number }
  );

  const pieChartData = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        label: "Shipment Status Breakdown",
        data: Object.values(statusCounts),
        backgroundColor: Object.keys(statusCounts).map(status => statusColors[status as keyof typeof statusColors]),
      },
    ],
  };

  const chartData = {
    labels: Object.keys(monthlyShipments),
    datasets: [
      {
        label: "",
        data: Object.values(monthlyShipments),
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.3)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false, 
      },
      title: {
        display: true,
        text: "Monthly Shipment Trends",
      },

    },
    animations: {
      tension: {
        duration: 1000,
        easing: 'easeInOutQuad' as const,
        from: 1,
        to: 0,
        loop: true
      }
    },
  };

  return (
    <div className="space-y-6">
      <AnalyticsCard data={shipmentData}/>
      <div className="flex space-x-4">
        <Button variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")}>
          All
        </Button>
        <Button variant={filter === "delivered" ? "default" : "outline"} onClick={() => setFilter("delivered")}>
          Delivered
        </Button>
        
        <Button variant={filter === "pending" ? "default" : "outline"} onClick={() => setFilter("pending")}>
          Pending
        </Button>
        <Button variant={filter === "failed" ? "default" : "outline"} onClick={() => setFilter("failed")}>
          Failed
        </Button>
      </div>
<div className="grid grid-cols-12 gap-4 ">
  <div className="col-span-12 md:col-span-6 lg:col-span-8">
  <Card>
            <CardContent>
              <div>

              </div>
              <div className="mt-4 flex flex-row flex-wrap space-y-2 lg:flex-nowrap justify-between md:space-x-4 items-center">
                <h1 className="text-lg">Shipments</h1>
                <div className="md:ml-auto flex flex-row space-x-3">
                <Input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                  className="border p-2 rounded "
                />
                <Input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                  className="border p-2 rounded"
                />
                </div>
               
              </div>
              <Line data={chartData} options={chartOptions} />
            </CardContent>
          </Card>
  </div>

<div className="col-span-12 md:col-span-6 lg:col-span-4">
<Card>
        <CardContent>
          <div className="py-4">
          <h2 className="text-lg">Shipment Status Overview</h2>
          </div>
          <Pie data={pieChartData} />
       
        </CardContent>
      </Card>
</div>

        

</div>

      
      <Card>
        <CardContent>
          <div className="py-4">
          <h2 className="text-xl font-semibold mb-4">Shipment Locations Overview</h2>
          </div>
          <div className="h-96">
            <Map locations={filteredData.map((data) => [data.location[0], data.location[1]])} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};


export default Main;
