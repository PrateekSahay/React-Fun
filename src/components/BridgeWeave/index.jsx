import React from "react";
import { Line } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import { useTable } from "react-table";
import {Chart, ArcElement, CategoryScale, LinearScale, PointElement, LineElement} from 'chart.js'
Chart.register(ArcElement);
Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(PointElement);
Chart.register(LineElement);

const studentData = [
  {
    name: "Dev Smith",
    age: 21,
    date_of_birth: "2019-08-07",
    city: "Ahmedabad",
    grades: {
      Math: 67,
      Science: 69,
      English: 62,
      History: 78,
      Programming: 68,
    },
  },
  {
    name: "Ritvik Miller",
    age: 20,
    date_of_birth: "2014-04-18",
    city: "Mumbai",
    grades: {
      Math: 68,
      Science: 83,
      English: 80,
      History: 69,
      Programming: 77,
    },
  },
  {
    name: "Ishaan Nelson",
    age: 20,
    date_of_birth: "2021-06-18",
    city: "Kolkata",
    grades: {
      Math: 77,
      Science: 81,
      English: 74,
      History: 92,
      Programming: 81,
    },
  },
  {
    name: "Sanya Patel",
    age: 21,
    date_of_birth: "2015-01-29",
    city: "Bangalore",
    grades: {
      Math: 87,
      Science: 74,
      English: 93,
      History: 95,
      Programming: 67,
    },
  },
  {
    name: "Myra Rodriguez",
    age: 20,
    date_of_birth: "2020-06-06",
    city: "Bangalore",
    grades: {
      Math: 100,
      Science: 95,
      English: 95,
      History: 92,
      Programming: 81,
    },
  },
  {
    name: "Ishita Jackson",
    age: 18,
    date_of_birth: "2015-07-01",
    city: "Pune",
    grades: {
      Math: 89,
      Science: 89,
      English: 78,
      History: 79,
      Programming: 79,
    },
  },
  {
    name: "Vihaan Williams",
    age: 20,
    date_of_birth: "2004-10-02",
    city: "Pune",
    grades: {
      Math: 92,
      Science: 98,
      English: 71,
      History: 81,
      Programming: 61,
    },
  },
  {
    name: "Aanya Perez",
    age: 18,
    date_of_birth: "2012-09-18",
    city: "Bangalore",
    grades: {
      Math: 91,
      Science: 61,
      English: 80,
      History: 82,
      Programming: 87,
    },
  },
  {
    name: "Dev Johnson",
    age: 19,
    date_of_birth: "2021-01-03",
    city: "Kolkata",
    grades: {
      Math: 73,
      Science: 90,
      English: 87,
      History: 73,
      Programming: 63,
    },
  },
  {
    name: "Dev Taylor",
    age: 20,
    date_of_birth: "2020-11-08",
    city: "Delhi",
    grades: {
      Math: 81,
      Science: 93,
      English: 71,
      History: 90,
      Programming: 69,
    },
  },
  {
    name: "Shlok Young",
    age: 20,
    date_of_birth: "2008-12-29",
    city: "Delhi",
    grades: {
      Math: 75,
      Science: 94,
      English: 81,
      History: 99,
      Programming: 63,
    },
  },
  {
    name: "Advait Walker",
    age: 20,
    date_of_birth: "2005-10-30",
    city: "Hyderabad",
    grades: {
      Math: 76,
      Science: 78,
      English: 65,
      History: 73,
      Programming: 66,
    },
  },
  {
    name: "Aryan Davis",
    age: 20,
    date_of_birth: "2014-01-18",
    city: "Chennai",
    grades: {
      Math: 77,
      Science: 78,
      English: 68,
      History: 72,
      Programming: 73,
    },
  },
  {
    name: "Ananya Mukherjee",
    age: 19,
    date_of_birth: "2006-10-04",
    city: "Delhi",
    grades: {
      Math: 89,
      Science: 87,
      English: 63,
      History: 90,
      Programming: 91,
    },
  },
  {
    name: "Arnav Smith",
    age: 21,
    date_of_birth: "2012-04-11",
    city: "Chennai",
    grades: {
      Math: 91,
      Science: 90,
      English: 83,
      History: 77,
      Programming: 84,
    },
  },
];

const StudentTable = ({ studentData }) => {
  const formatStudentDataForTable = () => {
    return studentData.map((student) => ({
      name: student.name,
      id: student.age,
      grade:
        Object.values(student.grades).reduce((a, b) => a + b, 0) /
        Object.keys(student.grades).length,
      joinDate: student.date_of_birth,
      leaveDate: student.leave_date || "N/A",
    }));
  };

  const columns = [
    { Header: "Name", accessor: "name" },
    { Header: "ID", accessor: "id" },
    { Header: "Grade", accessor: "grade" },
    { Header: "Join Date", accessor: "joinDate" },
    { Header: "Leave Date", accessor: "leaveDate" },
  ];

  const data = formatStudentDataForTable();

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <table {...getTableProps()} style={{ marginTop: "20px" }}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const LineGraph = ({ studentData }) => {
  const calculateJoinersAndLeavers = () => {
    const joiners = {};
    const leavers = {};

    studentData.forEach((student) => {
      const joinDate = student.date_of_birth;
      const leaveDate = student.leave_date;

      if (joinDate in joiners) {
        joiners[joinDate]++;
      } else {
        joiners[joinDate] = 1;
      }

      if (leaveDate && leaveDate in leavers) {
        leavers[leaveDate]++;
      } else if (leaveDate) {
        leavers[leaveDate] = 1;
      }
    });

    const dates = [
      ...new Set([...Object.keys(joiners), ...Object.keys(leavers)]),
    ];

    const joinersData = dates.map((date) => joiners[date] || 0);
    const leaversData = dates.map((date) => leavers[date] || 0);

    return { dates, joinersData, leaversData };
  };

  const { dates, joinersData, leaversData } = calculateJoinersAndLeavers();

  const data = {
    labels: dates,
    datasets: [
      {
        label: "Joiners",
        borderColor: "#36A2EB",
        data: joinersData,
      },
      {
        label: "Leavers",
        borderColor: "#FFCE56",
        data: leaversData,
      },
    ],
  };

  return <Line data={data} />;
};

const PieChart = ({ studentData }) => {
  const calculateGradeDistribution = () => {
    const gradeCounts = {
      A: 0,
      B: 0,
      C: 0,
      D: 0,
      F: 0,
    };

    studentData.forEach((student) => {
      const grade =
        Object.values(student.grades).reduce((a, b) => a + b, 0) /
        Object.keys(student.grades).length;

      if (grade >= 90) {
        gradeCounts.A++;
      } else if (grade >= 80) {
        gradeCounts.B++;
      } else if (grade >= 70) {
        gradeCounts.C++;
      } else if (grade >= 60) {
        gradeCounts.D++;
      } else {
        gradeCounts.F++;
      }
    });

    return Object.values(gradeCounts);
  };

  const data = {
    labels: ["A", "B", "C", "D", "F"],
    datasets: [
      {
        data: calculateGradeDistribution(),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#8C44FC",
          "#44FC8C",
        ],
      },
    ],
  };

  return <Pie data={data} />;
};

const HomePage = ({ studentData }) => {
  return (
    <div>
      <h1>Student Information Dashboard</h1>
       <PieChart studentData={studentData} />
       <LineGraph studentData={studentData} /> 
      <StudentTable studentData={studentData} />
    </div>
  );
};

export default function App1() {
  return (
    <div className="App">
      <HomePage studentData={studentData} />
    </div>
  );
}
