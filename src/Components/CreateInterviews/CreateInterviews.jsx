import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import styles from "./Styles.module.css";
import warning from "../../assets/warning.png";
import * as Yup from "yup";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

export default function CreateInterviews() {
  const [categories, setCategories] = useState([]);
  const [topics, setTopics] = useState([]);

  let formik = useFormik({
    initialValues: {
      name: "",
      weight: 0,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      weight: Yup.string().required("Weight is required"),
    }),
    onSubmit: (values) => {
      console.log("Form submitted:", values);
      createCategory(values);
    },
  });

  let topicFormik = useFormik({
    initialValues: {
      name: "",
      categoryId: 0,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      categoryId: Yup.number().required("Category is required"),
    }),
    onSubmit: (values) => {
      console.log(values);
      createTopic(values);
    },
  });

  //   create category
  async function createCategory(values) {
    return axios
      .post("https://intervyouquestions.runasp.net/api/Categories", values)
      .then((res) => {
        console.log(res.data);
        alert("Category Created")
        getCategory()
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //   get category
  async function getCategory() {
    return axios
      .get("https://intervyouquestions.runasp.net/api/Categories")
      .then((res) => {
        console.log(res.data);
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //  create Topic
  async function createTopic(values) {
    return axios
      .post("https://intervyouquestions.runasp.net/api/Topics", values)
      .then((res) => {
        console.log(res.data);
        alert("Topic Created")
        getTopics()
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //   get topics
  async function getTopics() {
    return axios
      .get("https://intervyouquestions.runasp.net/api/Topics")
      .then((res) => {
        console.log(res.data, "TOPPPPIIICSS");
        setTopics(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getCategory();
    getTopics();
  }, []);

  return (
    <div>
      <div className="accordion" id="accordionExample">
        {/* Category */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              Categories
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <div className="d-flex justify-content-end">
                <button
                  className="btn btn-outline-success"
                  data-bs-toggle="modal"
                  data-bs-target="#createCatModal"
                >
                  <i className="fa-solid fa-plus me-2"></i>
                  Create New Category
                </button>
              </div>
              {/* create category modal */}
              <div
                className="modal fade"
                id="createCatModal"
                tabIndex={-1}
                aria-labelledby="createCatModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header border-0">
                      <h1
                        className="modal-title fs-5 "
                        id="createCatModalLabel"
                      >
                        Create Category
                      </h1>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      />
                    </div>
                    <div className="modal-body">
                      <form
                        onSubmit={formik.handleSubmit}
                        className="d-flex flex-column gap-4"
                      >
                        <div className="input-box">
                          <label htmlFor="name" className="mb-3">
                            Category Name :
                          </label>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            className="form-control"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                          />
                          {formik.touched.name && formik.errors.name ? (
                            <div
                              className="alert alert-danger mt-3"
                              role="alert"
                            >
                              <i className="fa-solid fa-circle-exclamation me-2"></i>
                              {formik.errors.name}
                            </div>
                          ) : null}
                        </div>
                        <div className="input-box">
                          <label htmlFor="weight" className="mb-3">
                            Category Weight :
                          </label>
                          <input
                            id="weight"
                            name="weight"
                            type="text"
                            className="form-control"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.weight}
                          />
                          {formik.touched.weight && formik.errors.weight ? (
                            <div
                              className="alert alert-danger mt-3"
                              role="alert"
                            >
                              <i className="fa-solid fa-circle-exclamation me-2"></i>

                              {formik.errors.weight}
                            </div>
                          ) : null}
                        </div>
                        <div className="btns d-flex gap-2 justify-content-end mt-3 py-2">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                          <button type="submit" className="btn btn-success">
                            Create Category
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center flex-column mt-3">
                {categories.length !== 0 ? (
                  categories?.map((cat) => (
                    <div
                      className={`${styles.layer} d-flex justify-content-between align-items-center  px-2 py-3 rounded-2`}
                      key={cat.categoryId}
                    >
                      <p className="mb-0" key={cat.categoryId}>
                        {cat.name}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-center">There is no categories yet</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Topic */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed show"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              Topic
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <div className="d-flex justify-content-end">
                <button
                  className="btn btn-outline-success"
                  data-bs-toggle="modal"
                  data-bs-target="#createtopic"
                >
                  <i className="fa-solid fa-plus me-2"></i>
                  Create New Topic
                </button>
              </div>
              {/* create topic */}
              <div
                className="modal fade"
                id="createtopic"
                tabIndex={-1}
                aria-labelledby="createtopicLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header border-0">
                      <h1 className="modal-title fs-5 " id="createtopicLabel">
                        Create Topic
                      </h1>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      />
                    </div>
                    <div className="modal-body">
                      <form
                        onSubmit={topicFormik.handleSubmit}
                        className="d-flex flex-column gap-4"
                      >
                        <div className="input-box">
                          <label htmlFor="name" className="mb-3">
                            Name :
                          </label>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            className="form-control"
                            onChange={topicFormik.handleChange}
                            onBlur={topicFormik.handleBlur}
                            value={topicFormik.values.name}
                          />
                          {topicFormik.touched.name &&
                            topicFormik.errors.name ? (
                            <div
                              className="alert alert-danger mt-3"
                              role="alert"
                            >
                              <i className="fa-solid fa-circle-exclamation me-2"></i>

                              {topicFormik.errors.name}
                            </div>
                          ) : null}
                        </div>
                        <div>
                          <label htmlFor="categoryId"> Category :</label>
                          <select
                            className="form-select mt-3"
                            name="categoryId"
                            id="categoryId"
                            value={topicFormik.values.categoryId}
                            onChange={topicFormik.handleChange}
                          >
                            {categories?.map((cat) => (
                              <option
                                key={cat.categoryId}
                                value={cat.categoryId}
                              >
                                {cat.name}
                              </option>
                            ))}
                          </select>
                          {topicFormik.touched.categoryId &&
                            topicFormik.errors.categoryId ? (
                            <div
                              className="alert alert-danger mt-3"
                              role="alert"
                            >
                              <i className="fa-solid fa-circle-exclamation"></i>
                              {topicFormik.errors.categoryId}
                            </div>
                          ) : null}
                        </div>

                        <div className="btns d-flex gap-2 justify-content-end mt-3 py-2">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                          <button type="submit" className="btn btn-success">
                            Create Topic
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center flex-column mt-3">
                {topics.length !== 0 ? (
                  topics?.map((topic) => (
                    <div
                      className={`${styles.layer} d-flex justify-content-between align-items-center  px-2 py-3 rounded-2`}
                      key={topic.topicId}
                    >
                      <p className="mb-0" key={topic.topicId}>
                        {topic.name}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-center">There is no topics yet</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}
