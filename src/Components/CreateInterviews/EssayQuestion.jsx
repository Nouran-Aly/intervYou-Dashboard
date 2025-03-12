import axios from 'axios';
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import * as Yup from "yup";

export default function EssayQuestion() {
    const [topics, setTopics] = useState([]);
    const [correctAnswer, setcorrectAnswer] = useState(null);

    const formik = useFormik({
        initialValues: {
            type: "essay",
            text: "",
            difficulty: "",
            topicId: null,
            modelAnswers: [
                {
                    text: "",
                    keyPoints: ""
                }
            ]
        },
        validationSchema: Yup.object({
            text: Yup.string().required("Question is required"),
            difficulty: Yup.string().required("Difficulty is required"),
            topicId: Yup.number().required("Topic is required"),
            modelAnswers: Yup.array()
                .of(
                    Yup.object({
                        keyPoints: Yup.string().required("Atleast one key point is required"),
                    })
                )
                .required("Atleast one key point is required"),
        }),
        onSubmit: (values) => {
            console.log(values, "ESAAAAYYYY");
            createEssayQuestion(values)
        }
    })

    //  create essay Question
    async function createEssayQuestion(values) {
        return axios
            .post(
                "https://intervyouquestions.runasp.net/api/Questions/add-with-model-answers", values
            )
            .then((res) => {
                console.log(res.data);
                alert("Question Created")
                console.log("essay question created");
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
        getTopics();
    }, []);

    const handleCorrectChoice = (index) => {
        console.log(index);
        setcorrectAnswer(index);
        console.log(correctAnswer);
        formik.setFieldValue(
            "options",
            formik.values.options.map((option, i) => ({
                ...option,
                isCorrect: i === index,
            }))
        );
    };
    return (
        <div className='px-5'>
            <h1 className='mb-4'>Essay Question Area</h1>
            <form onSubmit={formik.handleSubmit}>
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
                        >
                            <option value="" selected> Essay</option>
                        </select>
                        {formik.touched.type &&
                            formik.errors.type ? (
                            <div className="alert alert-danger mt-3" role="alert">
                                <i className="fa-solid fa-circle-exclamation me-2"></i>
                                {formik.errors.type}
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
                            value={formik.values.difficulty}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        >
                            <option value="" >
                                Select the difficulty
                            </option>
                            <option value="easy">Easy</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="hard">Hard</option>
                        </select>
                        {formik.touched.difficulty &&
                            formik.errors.difficulty ? (
                            <div className="alert alert-danger mt-3" role="alert">
                                <i className="fa-solid fa-circle-exclamation me-2"></i>
                                {formik.errors.difficulty}
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
                            value={formik.values.topicId}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        >
                            <option value="" >
                                Select a topic
                            </option>
                            {topics?.map((topic) => (
                                <option key={topic.name} value={topic.topicId}>
                                    {topic.name}
                                </option>
                            ))}
                        </select>
                        {formik.touched.topicId &&
                            formik.errors.topicId ? (
                            <div className="alert alert-danger mt-3" role="alert">
                                <i className="fa-solid fa-circle-exclamation me-2"></i>
                                {formik.errors.topicId}
                            </div>
                        ) : null}
                    </div>
                    {/* question */}
                    <div className="col-12 mt-3">
                        <div className="mb-3">
                            <label htmlFor="text" className="form-label fw-medium">
                                Write The Question ...
                            </label>
                            <textarea
                                className="form-control"
                                id="text"
                                rows={5}
                                name="text"
                                values={formik.values.text || ""}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.text &&
                                formik.errors.text ? (
                                <div className="alert alert-danger mt-3" role="alert">
                                    <i className="fa-solid fa-circle-exclamation me-2"></i>
                                    {formik.errors.text}
                                </div>
                            ) : null}
                        </div>
                    </div>
                    {/* model answer */}
                    {formik.values.modelAnswers.map((answer, index) => (
                        <div key={index}>
                            {/* question text */}
                            <div className="mb-3">
                                <label htmlFor="text" className="form-label fw-medium">
                                    Write The Question Answer ...
                                </label>
                                <textarea
                                    className="form-control"
                                    id="text"
                                    rows={5}
                                    name="text"
                                    values={answer.text || ""}
                                    onChange={(e) => {
                                        const updatedAnswers = [...formik.values.modelAnswers];
                                        updatedAnswers[index].text = e.target.value;
                                        formik.setFieldValue("modelAnswers", updatedAnswers);
                                    }}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.text &&
                                    formik.errors.text ? (
                                    <div className="alert alert-danger mt-3" role="alert">
                                        <i className="fa-solid fa-circle-exclamation me-2"></i>
                                        {formik.errors.text}
                                    </div>
                                ) : null}
                            </div>
                            {/* key point */}
                            <div className="mb-3" >
                                <label
                                    htmlFor="essay"
                                    className="form-label fw-medium mt-2"
                                >
                                    Write The Keypoints ...
                                </label>
                                <textarea
                                    className="form-control"
                                    id="essay"
                                    name="keyPoints"
                                    rows={5}
                                    value={answer.keyPoints}
                                    onChange={(e) => {
                                        const updatedKeyPoints = [...formik.values.modelAnswers];
                                        updatedKeyPoints[index].keyPoints = e.target.value;
                                        formik.setFieldValue("modelAnswers", updatedKeyPoints);
                                    }}
                                    onBlur={formik.handleBlur}
                                />

                                {/* <div className="alert alert-danger mt-3" role="alert">
                                <i className="fa-solid fa-circle-exclamation me-2"></i>
                                {formik.errors.keyPoints}
                            </div> */}
                            </div>
                        </div>

                    ))}
                </div >
                <div className="d-flex justify-content-end">
                    <button className="btn btn-dark mt-3" type="submit" >
                        Submit Question
                    </button>
                </div>
            </form >
        </div>
    )
}
