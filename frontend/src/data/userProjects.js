export const userProjects = [
    {
        _id: "1",
        title: "Garden Design Project",
        description: "Design a garden using HTML/CSS. Collaborate with team members to complete the project. Learn to evaluate and provide feedback on team members' work.",
        teacher: {
            _id: "60d5ecb9f3eae72c8b8b8b8a",
            role: "teacher",
            fullName: "John Doe",
            email: "john.doe@example.com",
            avatar: "https://i.pinimg.com/474x/a9/b2/fd/a9b2fdb12dcf8a29b82b1ba291bcefac.jpg",
            dept: "Computer Science",
        },
        students: [
            {
                _id: "60d5ecb9f3eae72c8b8b8b8b",
                role: "student",
                fullName: "Jane Smith",
                email: "jane.smith@example.com",
                avatar: "https://i.pinimg.com/474x/52/2f/01/522f017123b1acc8824c1c2368987cc8.jpg",
                dept: "Software Engineering",
            },
            {
                _id: "60d5ecb9f3eae72c8b8b8b8c",
                role: "student",
                fullName: "Alice Johnson",
                email: "alice.johnson@example.com",
                avatar: "https://i.pinimg.com/474x/65/78/e7/6578e7e2b0b5ee1250f6edfe1fa666ef.jpg",
                dept: "Data Science",
            },
        ],
        admin: {
            _id: "60d5ecb9f3eae72c8b8b8b8d",
            role: "admin",
            fullName: "Bob Brown",
            email: "bob.brown@example.com",
            avatar: "https://i.pinimg.com/474x/52/2f/01/522f017123b1acc8824c1c2368987cc8.jpg",
            dept: "Management",
        },
        deadline1: "2024-06-01T00:00:00.000Z",
        deadline2: "2024-07-01T00:00:00.000Z",
        isApproved: false,
        submissions: [
            {
                _id: "60d5ecb9f3eae72c8b8b8b8g",
                student: {
                    _id: "60d5ecb9f3eae72c8b8b8b8d",
                    role: "admin",
                    fullName: "Bob Brown",
                    email: "bob.brown@example.com",
                    avatar: "https://i.pinimg.com/474x/52/2f/01/522f017123b1acc8824c1c2368987cc8.jpg",
                    dept: "Management",
                },
                workingDescription: "Completed HTML/CSS basics.",
                stage: "stage1",
                deadline: "2024-06-15T00:00:00.000Z",
                files: [
                    {
                        fileName: "index.html",
                        filePath: "/uploads/index.html",
                    },
                    {
                        fileName: "styles.css",
                        filePath: "/uploads/styles.css",
                    },
                ],
                isEvaluated: false,
                evaluation: {
                    criteria: {
                        scopeOrCreative: 7,
                        managementAndPlanning: 8,
                        documentation: 9,
                        execution: 6,
                        presentation: 8,
                    },
                    feedback: "Great start Keep up the good work.",
                },
            },
            {
                _id: "60d5ecb9f3eae72c8b8b8b8h",
                student: {
                    _id: "60d5ecb9f3eae72c8b8b8b8d",
                    role: "admin",
                    fullName: "Bob Brown",
                    email: "bob.brown@example.com",
                    avatar: "https://i.pinimg.com/474x/52/2f/01/522f017123b1acc8824c1c2368987cc8.jpg",
                    dept: "Management",
                },
                workingDescription: "Started JavaScript tutorial.",
                stage: "stage1",
                deadline: "2024-06-20T00:00:00.000Z",
                files: [
                    {
                        fileName: "script.js",
                        filePath: "/uploads/script.js",
                    },
                ],
                isEvaluated: false,
                evaluation: {
                    criteria: {
                        scopeOrCreative: 5,
                        managementAndPlanning: 6,
                        documentation: 7,
                        execution: 5,
                        presentation: 6,
                    },
                    feedback: "Good progress. Need to focus on execution.",
                },
            },
        ],
    },
    {
        _id: "2",
        title: "Home delivery system project",
        description: "Develop a home delivery system using MERN stack. Collaborate with team members to complete the project. Learn to evaluate and provide feedback on team members' work.",
        teacher: {
            _id: "60d5ecb9f3eae72c8b8b8b8a",
            role: "teacher",
            fullName: "John Doe",
            email: "john.doe@example.com",
            avatar: "https://i.pinimg.com/474x/a9/b2/fd/a9b2fdb12dcf8a29b82b1ba291bcefac.jpg",
            dept: "Computer Science",
        },
        students: [
            {
                _id: "60d5ecb9f3eae72c8b8b8b8b",
                role: "student",
                fullName: "Jane Smith",
                email: "jane.smith@example.com",
                avatar: "https://i.pinimg.com/474x/52/2f/01/522f017123b1acc8824c1c2368987cc8.jpg",
                dept: "Software Engineering",
            },
            {
                _id: "60d5ecb9f3eae72c8b8b8b8c",
                role: "student",
                fullName: "Alice Johnson",
                email: "alice.johnson@example.com",
                avatar: "https://i.pinimg.com/474x/65/78/e7/6578e7e2b0b5ee1250f6edfe1fa666ef.jpg",
                dept: "Data Science",
            },
        ],
        admin: {
            _id: "60d5ecb9f3eae72c8b8b8b8d",
            role: "admin",
            fullName: "Bob Brown",
            email: "bob.brown@example.com",
            avatar: "https://i.pinimg.com/474x/52/2f/01/522f017123b1acc8824c1c2368987cc8.jpg",
            dept: "Management",
        },
        deadline1: "2024-06-01T00:00:00.000Z",
        deadline2: "2024-07-01T00:00:00.000Z",
        isApproved: false,
        submissions: [
            {
                _id: "60d5ecb9f3eae72c8b8b8b8g",
                student: {
                    _id: "60d5ecb9f3eae72c8b8b8b8d",
                    role: "admin",
                    fullName: "Bob Brown",
                    email: "bob.brown@example.com",
                    avatar: "https://i.pinimg.com/474x/52/2f/01/522f017123b1acc8824c1c2368987cc8.jpg",
                    dept: "Management",
                },
                workingDescription: "Completed HTML/CSS basics.",
                stage: "stage1",
                deadline: "2024-06-15T00:00:00.000Z",
                files: [
                    {
                        fileName: "index.html",
                        filePath: "/uploads/index.html",
                    },
                    {
                        fileName: "styles.css",
                        filePath: "/uploads/styles.css",
                    },
                ],
                isEvaluated: false,
                evaluation: {
                    criteria: {
                        scopeOrCreative: 7,
                        managementAndPlanning: 8,
                        documentation: 9,
                        execution: 6,
                        presentation: 8,
                    },
                    feedback: "Great start Keep up the good work.",
                },
            },
            {
                _id: "60d5ecb9f3eae72c8b8b8b8h",
                student: {
                    _id: "60d5ecb9f3eae72c8b8b8b8d",
                    role: "admin",
                    fullName: "Bob Brown",
                    email: "bob.brown@example.com",
                    avatar: "https://i.pinimg.com/474x/52/2f/01/522f017123b1acc8824c1c2368987cc8.jpg",
                    dept: "Management",
                },
                workingDescription: "Started JavaScript tutorial.",
                stage: "stage1",
                deadline: "2024-06-20T00:00:00.000Z",
                files: [
                    {
                        fileName: "script.js",
                        filePath: "/uploads/script.js",
                    },
                ],
                isEvaluated: false,
                evaluation: {
                    criteria: {
                        scopeOrCreative: 5,
                        managementAndPlanning: 6,
                        documentation: 7,
                        execution: 5,
                        presentation: 6,
                    },
                    feedback: "Good progress. Need to focus on execution.",
                },
            },
        ],
    },
    {
        _id: "3",
        title: "Web security project",
        description: "Learn web security fundamentals. Implement security measures in a web application. Collaborate with team members to complete the project. Learn to evaluate and provide feedback on team members' work.",
        teacher: {
            _id: "60d5ecb9f3eae72c8b8b8b8a",
            role: "teacher",
            fullName: "John Doe",
            email: "john.doe@example.com",
            avatar: "https://i.pinimg.com/474x/a9/b2/fd/a9b2fdb12dcf8a29b82b1ba291bcefac.jpg",
            dept: "Computer Science",
        },
        students: [
            {
                _id: "60d5ecb9f3eae72c8b8b8b8b",
                role: "student",
                fullName: "Jane Smith",
                email: "jane.smith@example.com",
                avatar: "https://i.pinimg.com/474x/52/2f/01/522f017123b1acc8824c1c2368987cc8.jpg",
                dept: "Software Engineering",
            },
            {
                _id: "60d5ecb9f3eae72c8b8b8b8c",
                role: "student",
                fullName: "Alice Johnson",
                email: "alice.johnson@example.com",
                avatar: "https://i.pinimg.com/474x/65/78/e7/6578e7e2b0b5ee1250f6edfe1fa666ef.jpg",
                dept: "Data Science",
            },
        ],
        admin: {
            _id: "60d5ecb9f3eae72c8b8b8b8d",
            role: "admin",
            fullName: "Bob Brown",
            email: "bob.brown@example.com",
            avatar: "https://i.pinimg.com/474x/52/2f/01/522f017123b1acc8824c1c2368987cc8.jpg",
            dept: "Management",
        },
        deadline1: "2024-06-01T00:00:00.000Z",
        deadline2: "2024-07-01T00:00:00.000Z",
        isApproved: false,
        submissions: [
            {
                _id: "60d5ecb9f3eae72c8b8b8b8g",
                student: {
                    _id: "60d5ecb9f3eae72c8b8b8b8d",
                    role: "admin",
                    fullName: "Bob Brown",
                    email: "bob.brown@example.com",
                    avatar: "https://i.pinimg.com/474x/52/2f/01/522f017123b1acc8824c1c2368987cc8.jpg",
                    dept: "Management",
                },
                workingDescription: "Completed HTML/CSS basics.",
                stage: "stage1",
                deadline: "2024-06-15T00:00:00.000Z",
                files: [
                    {
                        fileName: "index.html",
                        filePath: "/uploads/index.html",
                    },
                    {
                        fileName: "styles.css",
                        filePath: "/uploads/styles.css",
                    },
                ],
                isEvaluated: false,
                evaluation: {
                    criteria: {
                        scopeOrCreative: 7,
                        managementAndPlanning: 8,
                        documentation: 9,
                        execution: 6,
                        presentation: 8,
                    },
                    feedback: "Great start Keep up the good work.",
                },
            },
            {
                _id: "60d5ecb9f3eae72c8b8b8b8h",
                student: {
                    _id: "60d5ecb9f3eae72c8b8b8b8d",
                    role: "admin",
                    fullName: "Bob Brown",
                    email: "bob.brown@example.com",
                    avatar: "https://i.pinimg.com/474x/52/2f/01/522f017123b1acc8824c1c2368987cc8.jpg",
                    dept: "Management",
                },
                workingDescription: "Started JavaScript tutorial.",
                stage: "stage1",
                deadline: "2024-06-20T00:00:00.000Z",
                files: [
                    {
                        fileName: "script.js",
                        filePath: "/uploads/script.js",
                    },
                ],
                isEvaluated: false,
                evaluation: {
                    criteria: {
                        scopeOrCreative: 5,
                        managementAndPlanning: 6,
                        documentation: 7,
                        execution: 5,
                        presentation: 6,
                    },
                    feedback: "Good progress. Need to focus on execution.",
                },
            },
        ],
    },
    {
        _id: "4",
        title: "Disease Prediction System",
        description: "Predict diseases using machine learning algorithms.",
        teacher: {
            _id: "60d5ecb9f3eae72c8b8b8b8a",
            role: "teacher",
            fullName: "John Doe",
            email: "john.doe@example.com",
            avatar: "https://i.pinimg.com/474x/a9/b2/fd/a9b2fdb12dcf8a29b82b1ba291bcefac.jpg",
            dept: "Computer Science",
        },
        students: [
            {
                _id: "60d5ecb9f3eae72c8b8b8b8b",
                role: "student",
                fullName: "Jane Smith",
                email: "jane.smith@example.com",
                avatar: "https://i.pinimg.com/474x/52/2f/01/522f017123b1acc8824c1c2368987cc8.jpg",
                dept: "Software Engineering",
            },
            {
                _id: "60d5ecb9f3eae72c8b8b8b8c",
                role: "student",
                fullName: "Alice Johnson",
                email: "alice.johnson@example.com",
                avatar: "https://i.pinimg.com/474x/65/78/e7/6578e7e2b0b5ee1250f6edfe1fa666ef.jpg",
                dept: "Data Science",
            },
        ],
        admin: {
            _id: "60d5ecb9f3eae72c8b8b8b8d",
            role: "admin",
            fullName: "Bob Brown",
            email: "bob.brown@example.com",
            avatar: "https://i.pinimg.com/474x/52/2f/01/522f017123b1acc8824c1c2368987cc8.jpg",
            dept: "Management",
        },
        deadline1: "2024-06-01T00:00:00.000Z",
        deadline2: "2024-07-01T00:00:00.000Z",
        isApproved: false,
        submissions: [
            {
                _id: "60d5ecb9f3eae72c8b8b8b8g",
                student: {
                    _id: "60d5ecb9f3eae72c8b8b8b8d",
                    role: "admin",
                    fullName: "Bob Brown",
                    email: "bob.brown@example.com",
                    avatar: "https://i.pinimg.com/474x/52/2f/01/522f017123b1acc8824c1c2368987cc8.jpg",
                    dept: "Management",
                },
                workingDescription: "Completed HTML/CSS basics.",
                stage: "stage1",
                deadline: "2024-06-15T00:00:00.000Z",
                files: [
                    {
                        fileName: "index.html",
                        filePath: "/uploads/index.html",
                    },
                    {
                        fileName: "styles.css",
                        filePath: "/uploads/styles.css",
                    },
                ],
                isEvaluated: false,
                evaluation: {
                    criteria: {
                        scopeOrCreative: 7,
                        managementAndPlanning: 8,
                        documentation: 9,
                        execution: 6,
                        presentation: 8,
                    },
                    feedback: "Great start Keep up the good work.",
                },
            },
            {
                _id: "60d5ecb9f3eae72c8b8b8b8h",
                student: {
                    _id: "60d5ecb9f3eae72c8b8b8b8d",
                    role: "admin",
                    fullName: "Bob Brown",
                    email: "bob.brown@example.com",
                    avatar: "https://i.pinimg.com/474x/52/2f/01/522f017123b1acc8824c1c2368987cc8.jpg",
                    dept: "Management",
                },
                workingDescription: "Started JavaScript tutorial.",
                stage: "stage1",
                deadline: "2024-06-20T00:00:00.000Z",
                files: [
                    {
                        fileName: "script.js",
                        filePath: "/uploads/script.js",
                    },
                ],
                isEvaluated: false,
                evaluation: {
                    criteria: {
                        scopeOrCreative: 5,
                        managementAndPlanning: 6,
                        documentation: 7,
                        execution: 5,
                        presentation: 6,
                    },
                    feedback: "Good progress. Need to focus on execution.",
                },
            },
        ],
    }
];
