import axios from 'axios';
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import * as Yup from "yup";


export default function McqQuestion() {
    const [topics, setTopics] = useState([]);
    const [correctAnswer, setcorrectAnswer] = useState(null);

    const formik = useFormik({
        initialValues: {
            type: "mcq",
            text: "",
            difficulty: "",
            topicId: null,
            options: [
                { text: "", isCorrect: false },
                { text: "", isCorrect: false },
                { text: "", isCorrect: false },
                { text: "", isCorrect: false },
            ],
        },
        validationSchema: Yup.object({
            text: Yup.string().required("Question is required"),
            difficulty: Yup.string().required("Difficulty is required"),
            topicId: Yup.string().required("Topic is required"),
            options: Yup.array()
                .of(
                    Yup.object({
                        text: Yup.string().required(),
                    })
                )
                // .min("at least two options are required")
                .required("required"),
        }),
        onSubmit: (values) => {
            console.log(values, "MCQ");
            createQuestion(values)
        }
    })

    //  create mcq Question
    async function createQuestion(values) {
        return axios
            .post(
                "https://intervyouquestions.runasp.net/api/Questions/add-with-options", values
            )
            .then((res) => {
                console.log(res.data);
                alert("Question Created")
                console.log("question created");
            })
            .catch((err) => {
                console.log(err.response.data);
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
            <h1 className='mb-4'>Mcq Question Area</h1>
            <form onSubmit={formik.handleSubmit}>
                <div className="row">
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
                            <option value="" selected>Mcq</option>
                        </select>
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
                            <option value="Easy">Easy</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Hard">Hard</option>
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
                                Select the Topic
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
                    {/* answers */}
                    <h3>Question Answers</h3>
                    <p className="text-muted">
                        Atleast two answers are required
                    </p>
                    <div className="row row-gap-4 mb-3">
                        {
                            formik.values.options.map((option, index) => (
                                <div className="col-md-6" key={index}>
                                    <label htmlFor={`choice${index + 1}`} className="form-label">
                                        Choice {index + 1}
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id={`choice${index + 1}`}
                                        placeholder={`Write choice ${index + 1}`}
                                        name={`options[${index}].text`} // Correct Formik field name
                                        value={option.text || ""} // ✅ Ensure it's a string
                                        onChange={formik.handleChange}
                                    // onBlur={formik.handleBlur}
                                    />
                                    <div className="form-check mt-2">
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
                    {/* {formik.touched.options &&
                        formik.errors.options ? (
                        <div className="alert alert-danger mt-3" role="alert">
                            <i className="fa-solid fa-circle-exclamation me-2"></i>
                            {formik.errors.options}
                        </div>
                    ) : null} */}
                </div >
                <div className="d-flex justify-content-end">
                    < button className="btn btn-dark mt-3" type="submit" >
                        Submit Question
                    </button>
                </div>
            </form >
        </div>

    )
}

