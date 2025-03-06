import React from "react";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import { Pie } from "react-chartjs-2";
import PieChart from "./PieChart";

export default function Dashboard() {
  return (
    <div>
      <div className="d-flex justify-content-between bg-white py-4 px-5 rounded-4 flex-wrap row-gap-4">
        {/* item 1 */}
        <div className="d-flex justify-content-center align-items-center gap-4">
          <div className="large-icon d-grid bg-dark-blue text-white rounded-circle">
            <i className="fa-solid fa-users m-auto"></i>
          </div>
          <div className="statistics">
            <p className="mb-0 text-muted">Students</p>
            <p className="mb-0 fw-medium fs-5">100</p>
          </div>
        </div>
        {/* item 2 */}
        <div className="d-flex justify-content-center align-items-center gap-4">
          <div className="large-icon d-grid bg-teal-blue text-white rounded-circle">
            <i className="fa-solid fa-question m-auto"></i>
          </div>
          <div className="statistics">
            <p className="mb-0 text-muted">Quizes</p>
            <p className="mb-0 fw-medium fs-5">100</p>
          </div>
        </div>
        {/* item 3 */}
        <div className="d-flex justify-content-center align-items-center gap-4">
          <div className="large-icon d-grid bg-mint-green text-white rounded-circle">
            <i class="fa-regular fa-file m-auto"></i>
          </div>
          <div className="statistics">
            <p className="mb-0 text-muted">Generated CVs</p>
            <p className="mb-0 fw-medium fs-5">100</p>
          </div>
        </div>
        {/* item 4 */}
        <div className="d-flex justify-content-center align-items-center gap-4">
          <div className="large-icon d-grid bg-off-white rounded-circle">
            <i className="fa-solid fa-question m-auto"></i>
          </div>
          <div className="statistics">
            <p className="mb-0 text-muted">Questions</p>
            <p className="mb-0 fw-medium fs-5">100</p>
          </div>
        </div>
      </div>
      <div className="row my-5 row-gap-4">
        <div className="col-md-6 ">
          <div className="bg-white p-5 rounded-5">
            <h4 className="mb-4">User Growth</h4>
            <LineChart />
          </div>
        </div>
        <div className="col-md-6">
          <div className="bg-white p-5 rounded-5">
            <h4 className="mb-4">User Activity</h4>
            <LineChart />
          </div>
        </div>
        <div className="col-md-6">
          <div className="bg-white p-5 rounded-5">
            <h4 className="mb-4">Number of mock interviews</h4>
            <BarChart />
          </div>
        </div>
        <div className="col-md-6">
          <div className="bg-white p-5 rounded-5 " >
            <h4 className="mb-4">Category Distribution</h4>
            <div className="" style={{ width: "50%", margin: "auto" }}>
              <PieChart />
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}
