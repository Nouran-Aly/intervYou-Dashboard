import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import styles from "./Styles.module.css";
import warning from "../../assets/warning.png";
import * as Yup from "yup";

export default function CreateInterviews() {
  const [categories, setCategories] = useState([]);
  const [topics, setTopics] = useState([]);
  const [answerOption, setAnswerOption] = useState();
  const [correctAnswer, setcorrectAnswer] = useState(0);

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
      console.log("Form submitted:", values); // Debug statement
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

  let questionFormik = useFormik({
    initialValues: {
      type: "",
      text: "",
      difficulty: "",
      topicId: 0,
      options: [
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
      ],
    },
    // validationSchema: Yup.object({
    //   type: Yup.string().required("Type is required"),
    //   text: Yup.string().required("Question is required"),
    //   difficulty: Yup.string().required("Difficulty is required"),
    //   topicId: Yup.number().required("Topic is required"),
    //   options: Yup.array()
    //     .of(
    //       Yup.object({
    //         text: Yup.string().required(),
    //       })
    //     )
    //     .min("at least two options are required")
    //     .required("required"),
    // }),
    onSubmit: (values) => {
      console.log(values, "create question values");
      createQuestion(values);
    },
  });

  //   create category
  async function createCategory(values) {
    return axios
      .post("http://intervyouquestions.runasp.net/api/Categories", values)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //   get category
  async function getCategory() {
    return axios
      .get("http://intervyouquestions.runasp.net/api/Categories")
      .then((res) => {
        console.log(res.data);
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //   delete category
  async function deleteCategory(catId) {
    return axios
      .delete(`http://intervyouquestions.runasp.net/api/Categories/${catId}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //  edit category
  async function editCategory(catId) {
    return axios
      .put(`http://intervyouquestions.runasp.net/api/Categories/${catId}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // create Topic
  async function createTopic(values) {
    return axios
      .post("http://intervyouquestions.runasp.net/api/Topics", values)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //   get topics
  async function getTopics() {
    return axios
      .get("http://intervyouquestions.runasp.net/api/Topics")
      .then((res) => {
        console.log(res.data, "TOPPPPIIICSS");
        setTopics(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //   delete Topic
  async function deleteTopic(topicId) {
    return axios
      .delete(`http://intervyouquestions.runasp.net/api/Topics/${topicId}`)
      .then((res) => {
        console.log(res.data, "Deleted");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //  create mcq Question
  async function createQuestion(values) {
    return axios
      .post(
        "http://intervyouquestions.runasp.net/api/Questions/add-with-options",
        values
      )
      .then((res) => {
        console.log(res.data);
        console.log("question created");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleAnswers = (e) => {
    console.log(e.target.value, "CLICKED");
    if (e.target.value === "MCQ") {
      setAnswerOption("MCQ");
    } else {
      setAnswerOption("Essay");
    }
  };

  const handleCorrectChoice = (index) => {
    console.log(index);

    setcorrectAnswer(index);
    questionFormik.setFieldValue(
      "options",
      questionFormik.values.options.map((option, i) => ({
        ...option,
        isCorrect: i === index,
      }))
    );
  };

  useEffect(() => {
    getCategory();
    getTopics();
  }, []);

  useEffect(() => {
    getCategory();
    getTopics();
  }, [setCategories, setTopics]);

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
            className="accordion-collapse collapse "
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
                      <div className="d-flex flex-column flex-md-row align-items-center gap-3">
                        <button className="btn btn-outline-warning">
                          <i className="fa-regular fa-pen-to-square me-2"></i>
                          Edit
                        </button>
                        <button
                          className="btn btn-outline-danger"
                          data-bs-toggle="modal"
                          data-bs-target="#deleteCategory"
                        >
                          <i className="fa-solid fa-trash me-2"></i>
                          Delete
                        </button>

                        {/* delete modal */}

                        <div
                          className="modal fade"
                          id="deleteCategory"
                          tabIndex={-1}
                          aria-labelledby="deleteCategoryLabel"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                              <div className="modal-header border-0">
                                <h1
                                  className="modal-title fs-5 "
                                  id="deleteCategoryLabel"
                                >
                                  Delete Category
                                </h1>
                                <button
                                  type="button"
                                  className="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                />
                              </div>
                              <div className="modal-body d-flex flex-column justify-content-center align-items-center gap-4 px-4">
                                <img
                                  src={warning}
                                  className="w-25"
                                  alt="warning icon"
                                />
                                <h4 className="text-center">Are you sure?</h4>
                                <p className="text-muted text-center">
                                  Are you sure you want to delete this category?
                                  This process can't be undone.
                                </p>
                              </div>
                              <div className="modal-footer border-0">
                                <button
                                  type="button"
                                  className="btn btn-secondary"
                                  data-bs-dismiss="modal"
                                >
                                  Cancel
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-danger"
                                  onClick={() => deleteCategory(cat.categoryId)}
                                  data-bs-dismiss="modal"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* ## */}
                      </div>
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
              className="accordion-button collapsed"
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
                      <div className="d-flex flex-column flex-md-row align-items-center gap-3">
                        <button className="btn btn-outline-warning">
                          <i className="fa-regular fa-pen-to-square me-2"></i>
                          Edit
                        </button>
                        <button
                          className="btn btn-outline-danger"
                          data-bs-toggle="modal"
                          data-bs-target="#deleteTopic"
                        >
                          <i className="fa-solid fa-trash me-2"></i>
                          Delete
                        </button>

                        {/* delete modal */}
                        <div
                          className="modal fade"
                          id="deleteTopic"
                          tabIndex={-1}
                          aria-labelledby="deleteTopicLabel"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                              <div className="modal-header border-0">
                                <h1
                                  className="modal-title fs-5 "
                                  id="deleteTopicLabel"
                                >
                                  Delete Category
                                </h1>
                                <button
                                  type="button"
                                  className="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                />
                              </div>
                              <div className="modal-body d-flex flex-column justify-content-center align-items-center gap-4 px-4">
                                <img
                                  src={warning}
                                  className="w-25"
                                  alt="warning icon"
                                />
                                <h4 className="text-center">Are you sure?</h4>
                                <p className="text-muted text-center">
                                  Are you sure you want to delete this category?
                                  This process can't be undone.
                                </p>
                              </div>
                              <div className="modal-footer border-0">
                                <button
                                  type="button"
                                  className="btn btn-secondary"
                                  data-bs-dismiss="modal"
                                >
                                  Cancel
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-danger"
                                  onClick={() => deleteTopic(topic.topicId)}
                                  data-bs-dismiss="modal"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center">There is no topics yet</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Question */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              Questions
            </button>
          </h2>
          <div
            id="collapseThree"
            className="accordion-collapse collapse show"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <form onSubmit={questionFormik.handleSubmit}>
                <div className="row row-gap-4">
                  {/* choose type */}
                  <div className="col-6 col-md-4">
                    <label htmlFor="type" className="fw-medium">
                      Question Type :
                    </label>
                    <select
                      className="form-select mt-3"
                      id="type"
                      name="type"
                      value={questionFormik.values.type}
                      onChange={(e) => {
                        handleAnswers(e);
                        questionFormik.handleChange(e);
                      }}
                      onBlur={questionFormik.handleBlur}
                    >
                      <option defaultValue>Select the type</option>
                      <option value="MCQ">Mcq</option>
                      <option value="ESSAY">Essay</option>
                      <option value="PROBLEM SOLVING">Problem Solving</option>
                    </select>
                    {questionFormik.touched.type &&
                    questionFormik.errors.type ? (
                      <div className="alert alert-danger mt-3" role="alert">
                        <i className="fa-solid fa-circle-exclamation me-2"></i>
                        {questionFormik.errors.type}
                      </div>
                    ) : null}
                  </div>
                  {/* choose difficulty */}
                  <div className="col-6 col-md-4">
                    <label htmlFor="difficulty" className="fw-medium">
                      Question Difficulty :
                    </label>
                    <select
                      className="form-select mt-3"
                      id="difficulty"
                      name="difficulty"
                      value={questionFormik.values.difficulty}
                      onChange={questionFormik.handleChange}
                      onBlur={questionFormik.handleBlur}
                    >
                      <option value={0} defaultValue>
                        Select the difficulty
                      </option>
                      <option value="Easy">Easy</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Hard">Hard</option>
                    </select>
                    {questionFormik.touched.difficulty &&
                    questionFormik.errors.difficulty ? (
                      <div className="alert alert-danger mt-3" role="alert">
                        <i className="fa-solid fa-circle-exclamation me-2"></i>
                        {questionFormik.errors.difficulty}
                      </div>
                    ) : null}
                  </div>
                  {/* choose topic */}
                  <div className="col-6 col-md-4">
                    <label htmlFor="topic" className="fw-medium">
                      Question Topic :
                    </label>
                    <select
                      className="form-select mt-3"
                      id="topic"
                      name="topicId"
                      value={questionFormik.values.topicId}
                      onChange={questionFormik.handleChange}
                      onBlur={questionFormik.handleBlur}
                    >
                      <option value={0} defaultValue disabled>
                        Select a topic
                      </option>
                      {topics?.map((topic) => (
                        <option key={topic.name} value={topic.topicId}>
                          {topic.name}
                        </option>
                      ))}
                    </select>
                    {questionFormik.touched.topicId &&
                    questionFormik.errors.topicId ? (
                      <div className="alert alert-danger mt-3" role="alert">
                        <i className="fa-solid fa-circle-exclamation me-2"></i>
                        {questionFormik.errors.topicId}
                      </div>
                    ) : null}
                  </div>
                  {/* question */}
                  <div className="col-12">
                    <div className="mb-3">
                      <label htmlFor="text" className="form-label fw-medium">
                        Write The Question ...
                      </label>
                      <textarea
                        className="form-control"
                        id="text"
                        rows={5}
                        name="text"
                        values={topicFormik.values.text}
                        onChange={questionFormik.handleChange}
                        onBlur={questionFormik.handleBlur}
                      />
                      {questionFormik.touched.text &&
                      questionFormik.errors.text ? (
                        <div className="alert alert-danger mt-3" role="alert">
                          <i className="fa-solid fa-circle-exclamation me-2"></i>
                          {questionFormik.errors.text}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
                {answerOption ? (
                  answerOption == "MCQ" ? (
                    <>
                      {/* // MCQ */}
                      <h3>Question Answers</h3>
                      <p className="text-muted">
                        Atleast two answers are required
                      </p>
                      <div className="row row-gap-4 mb-3">
                        {questionFormik.values.options.map((option, index) => (
                          <div className="col-md-6" key={index}>
                            <label
                              htmlFor={`choice${index + 1}`}
                              className="form-label"
                            >
                              Choice {index + 1}
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id={`choice${index + 1}`}
                              placeholder={`Write choice ${index + 1}`}
                              name={`options[${index}].text`} // Dynamically set name
                              value={option.text}
                              onChange={questionFormik.handleChange}
                              onBlur={questionFormik.handleBlur}
                            />
                            <div className="form-check">
                              <input
                                type="radio"
                                className="form-check-input"
                                name="correctChoice"
                                checked={correctAnswer === index}
                                onChange={() => handleCorrectChoice(index)} // Set the correct choice dynamically
                              />
                              <label className="form-check-label">
                                Correct
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                      {/* {questionFormik.touched.options &&
                      questionFormik.errors.options ? (
                        <div className="alert alert-danger mt-3" role="alert">
                          <i className="fa-solid fa-circle-exclamation me-2"></i>
                          {questionFormik.errors.options[0]?.text ||
                            questionFormik.errors.options}
                        </div>
                      ) : null} */}
                    </>
                  ) : (
                    <>
                      <h3>Question Answers</h3>
                      <div className="mb-3">
                        <label
                          htmlFor="essay"
                          className="form-label fw-medium mt-2"
                        >
                          Write The Answer ...
                        </label>
                        <textarea
                          className="form-control"
                          id="essay"
                          rows={5}
                        />
                      </div>
                      <div className="d-flex justify-content-end">
                        <button className="btn btn-dark mt-3" type="submit">
                          Submit Answer
                        </button>
                      </div>
                    </>
                  )
                ) : null}

                <div className="d-flex justify-content-end">
                  <button className="btn btn-dark mt-3" type="submit">
                    Submit Question
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
