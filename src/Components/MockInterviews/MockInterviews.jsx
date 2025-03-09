import axios from 'axios'
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import warning from "../../assets/warning.png";


export default function MockInterviews() {
    const [questions, setQuestions] = useState([])
    const [topics, setTopics] = useState([])
    const [categories, setCategories] = useState([]);

    async function getQuestions() {
        return await axios.get("https://intervyouquestions.runasp.net/api/Questions")
            .then((res) => {
                console.log(res.data, "Questions");
                setQuestions(res.data)
            }).catch((err) => {
                console.log(err);
            })
    }

    async function getTopics() {
        return await axios.get("https://intervyouquestions.runasp.net/api/Topics")
            .then((res) => {
                console.log(res.data, "Topics");
                setTopics(res.data)
            }).catch((err) => {
                console.log(err);
            })
    }

    async function getCategory() {
        return axios
            .get("https://intervyouquestions.runasp.net/api/Categories")
            .then((res) => {
                console.log(res.data, "categories");
                setCategories(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        getQuestions()
        getTopics()
        getCategory()
    }, [])


    let questionFormik = useFormik({
        initialValues: {
            type: "",
            text: "",
            difficulty: "",
            topicId: 0
        },
        onSubmit: (values) => {
            console.log(values);
            // editQuestion(values)
        }
    })

    //   delete question
    async function deleteQuestion(qId) {
        return axios
            .delete(`https://intervyouquestions.runasp.net/api/Questions/${qId}`)
            .then((res) => {
                console.log(res);
                getQuestions()
            })
            .catch((err) => {
                console.log(err);
            });
    }

    //   delete Topic
    async function deleteTopic(topicId) {
        return axios
            .delete(`https://intervyouquestions.runasp.net/api/Topics/${topicId}`)
            .then((res) => {
                console.log(res.data, "Deleted");
                getTopics()
            })
            .catch((err) => {
                console.log(err);
            });
    }

    //   delete category
    async function deleteCategory(catId) {
        return axios
            .delete(`https://intervyouquestions.runasp.net/api/Categories/${catId}`)
            .then((res) => {
                console.log(res.data);
                getCategory()
            })
            .catch((err) => {
                console.log(err);
            });
    }

    //   edit question
    async function editQuestion(qId) {
        return axios
            .put(`https://intervyouquestions.runasp.net/api/Questions/${qId}`)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err.response.data);
            });
    }

    return (
        <div className='container pb-'>
            {/* Questions */}
            <div className='mb-5'>
                <h3 className='text-center text-white bg-dark-blue rounded-3 py-2 mb-5'>Questions</h3>
                {questions?.map(question => (
                    <div key={question.questionId} className='d-flex flex-column justify-content-start gap-2 border-bottom pb-3 my-5'>
                        <form onSubmit={questionFormik.handleSubmit}>
                            <div className="row row-gap-3">
                                <p className='col-12 col-md-6 col-lg-3 fw-medium fs-6'>Difficulty :
                                    <span className='ms-2 bg-dark-blue text-white fw-medium px-3 py-2 rounded-3 text-capitalize' >{question.difficulty}</span>
                                </p>
                                <p className='col-12 col-md-6 col-lg-3 fw-medium fs-6'>Type :
                                    <span className='ms-2 bg-mint-green text-dark fw-medium px-3 py-2 rounded-3 text-capitalize'>  {question.type}</span>
                                </p>
                                <p className='col-12 col-md-6 col-lg-3 fw-medium fs-6'>Topic :
                                    <span className='ms-2 bg-navy-blue text-white fw-medium px-3 py-2 rounded-3'> {question.topicId}</span>
                                </p>
                                <p className='col-12 col-md-6 col-lg-3 fw-medium fs-6'>
                                    <button className='btn btn-outline-danger w-100' data-bs-toggle="modal"
                                        data-bs-target="#deleteQuestion">Delete</button>
                                    {/* delete modal */}
                                    <div
                                        className="modal fade"
                                        id="deleteQuestion"
                                        tabIndex={-1}
                                        aria-labelledby="deleteQuestionLabel"
                                        aria-hidden="true"
                                    >
                                        <div className="modal-dialog modal-dialog-centered">
                                            <div className="modal-content">
                                                <div className="modal-header border-0">
                                                    <h1
                                                        className="modal-title fs-5 "
                                                        id="deleteQuestionLabel"
                                                    >
                                                        Delete Question
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
                                                        Are you sure you want to delete this Question?
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
                                                        onClick={() => deleteQuestion(question.questionId)}
                                                        data-bs-dismiss="modal"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </p>
                            </div>
                            {/* QUESTION TEXT */}
                            <div className="d-flex flex-column mb-2">
                                <h5 className='mb-3'>Question Text</h5>
                                <p>{question.text}</p>
                            </div>
                            {/* QUESTION ANSWER */}
                            <div className="d-flex flex-column">
                                <h5 className='mb-3'>Question Answers</h5>
                                {question.type == "mcq" ?
                                    question.questionOptions?.map((option, index) => (
                                        <div key={option.optionId} className='d-flex gap-4'>
                                            <p> Answer{index + 1}:<span className='ms-4'>{option.text}</span> </p>
                                            {option.isCorrect == true ? (
                                                <p className='bg-success text-white px-3 py-1 rounded-2'> Correct</p>
                                            ) :
                                                <p className='bg-danger text-white px-3 py-1 rounded-2'> Wrong</p>
                                            }
                                        </div>
                                    )) :
                                    question.modelAnswers?.map((answer, index) => (
                                        <div key={answer.modelAnswerId} className='d-flex gap-4'>
                                            <p> Key Points:<span className='ms-2'>{answer.keyPoints}</span> </p>
                                        </div>
                                    ))
                                }

                            </div>
                        </form>

                    </div >
                ))}

            </div>

            {/* Topics */}
            <div className='mb-5'>
                <h3 className='text-center text-white bg-mint-green rounded-3 py-2'>Topics</h3>
                {topics?.map((topic, index) => (
                    <div key={topic.topicId} className='d-flex flex-column gap-2 mt-5'>
                        <div className="d-flex justify-content-between">
                            <p className='fw-medium fs-6'> Topic {index + 1} :
                                <span className='ms-2 bg-body-secondary fw-medium px-3 py-2 rounded-3'>  {topic?.name}</span>
                            </p>
                            <button className='btn btn-outline-danger' data-bs-toggle="modal"
                                data-bs-target="#deleteTopic" >Delete</button>
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
                                                Delete Topic
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
                                                Are you sure you want to delete this topic?
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

                    </div >
                ))}
            </div>

            {/* category */}
            <div>
                <h3 className='text-center text-white bg-navy-blue rounded-3 py-2'>Categories</h3>
                {categories?.map((category, index) => (
                    <div key={category.categoryId} className='d-flex flex-column  gap-2 mt-5'>
                        <div className="d-flex justify-content-between">
                            <p className='fw-medium fs-6'> category {index + 1} :
                                <span className='ms-2 bg-body-secondary fw-medium px-3 py-2 rounded-3'>Name:  {category?.name}</span>
                                <span className='ms-2 bg-body-secondary fw-medium px-3 py-2 rounded-3'>Weight:  {category?.weight}</span>
                            </p>

                            <button className='btn btn-outline-danger' data-bs-toggle="modal"
                                data-bs-target="#deleteCategory">Delete</button>
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
                                                onClick={() => deleteCategory(category.categoryId)}
                                                data-bs-dismiss="modal"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div >
                ))}
            </div>


        </div >
    )
}
