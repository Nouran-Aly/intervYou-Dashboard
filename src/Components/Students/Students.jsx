import React from "react";
import { Link } from "react-router-dom";

export default function Students() {
  return <div className="container">
    <h3 className="mb-3 text-center bg-dark-blue text-white py-2 rounded-3">Students</h3>
    <div className="bg-white p-4 rounded-4">
      <table class="table text-center">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>
              <Link>
                <i class="fa-solid fa-right-long"></i>
              </Link>
            </td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
            <td>
              <Link>
                <i class="fa-solid fa-right-long"></i>
              </Link>
            </td>

          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Aly</td>
            <td>Noah</td>
            <td>@twitter</td>
            <td>
              <Link>
                <i class="fa-solid fa-right-long"></i>
              </Link>
            </td>
          </tr>

        </tbody>
      </table>
    </div>

  </div>;
}
