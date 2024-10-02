"use client";

import { useState } from "react";
import { Progress } from "../components/shadecn_components/ui/progress";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../components/shadecn_components/ui/card";
import { Button } from "../components/shadecn_components/ui/button";
import { useAppDispatch } from "../../lib/redux/hooks";
import { incrementedByAmountPC } from "../../lib/redux/features/pc/pcSlice";
import {classes} from "../../lib/std";

export default function Component() {
    const [progress, setProgress] = useState(0);
    const [completedModules, setCompletedModules] = useState<number[]>([]);

    // TODO: Base dark mode off user state value


    // const pc_count = useSelector(selectCountPC);
    const dispatch = useAppDispatch();

    const modules = [
        {
            id: 1,
            title: "Introduction to Stock Trading",
            reward: 100,
            description: "Learn the basics of stock trading and how the stock market works.",
            content: (
                <div>
                    <div />
                    <div />
                </div>
            ),
        },
        {
            id: 2,
            title: "Fundamental Analysis",
            reward: 250,
            description:
                "Learn how to analyze a company's financial statements and other key metrics to determine its intrinsic value.",
            content: (
                <div>
                    <div />
                    <div />
                </div>
            ),
        },
        {
            id: 3,
            title: "Technical Analysis",
            reward: 250,
            description: "Learn how to use technical indicators and chart patterns to identify trading opportunities.",
            content: (
                <div>
                    <div />
                    <div />
                </div>
            ),
        },
        {
            id: 4,
            title: "Portfolio Management",
            reward: 250,
            description: "Learn how to build and manage a diversified investment portfolio.",
            content: (
                <div>
                    <div />
                    <div />
                </div>
            ),
        },
        {
            id: 5,
            title: "How to Bake a Ham",
            reward: 1000,
            description: "Learn how to bake a ham in a household oven",
            content: (
                <div>
                    <div />
                    <div />
                </div>
            ),
        },
        {
            id: 6,
            title: "Renaming Ceremonies",
            reward: 1000,
            description: "Want to re-name your step son Ron? We'll show you how!",
            content: (
                <div>
                    <div />
                    <div />
                </div>
            ),
        },
        {
            id: 7,
            title: "Brother Named Eric?",
            reward: 1150,
            description: "Yeah, we can change his name to Jeff with this one easy trick!",
            content: (
                <div>
                    <div />
                    <div />
                </div>
            ),
        },
        {
            id: 8,
            title: "The Art of Souffle",
            reward: 750,
            description: "How to make a souffle with 0 risk of deflation!",
            content: (
                <div>
                    <div />
                    <div />
                </div>
            ),
        },
    ];
    const handleModuleCompletion = (moduleId: number) => {

        const module_count = modules.length;
        const completed_count = completedModules.length === 0 ? 1 : (completedModules.length === modules.length ? completedModules.length : completedModules.length + 1);
        console.log(module_count, completed_count);


        setCompletedModules([...completedModules, moduleId]);
        setProgress((completed_count / module_count) * 100);
        dispatch(incrementedByAmountPC(modules[moduleId - 1].reward));

    };
    return (
        <div className="flex flex-col gap-8">
            <div className="md:flex items-center justify-between">
                <h2 className="text-2xl font-bold text-center">Education</h2>
                <div className="text-right w-full mr-1">
                    {progress}%
                </div>
                <Progress value={progress} className="w-full max-w-md" />
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {modules.map((module) => (
                    <Card key={module.id}>
                        <CardHeader>
                            <CardTitle>{module.title}</CardTitle>
                            <CardDescription>{module.description}</CardDescription>
                        </CardHeader>
                        <CardContent>{module.content}</CardContent>
                        <CardFooter className={classes(['flex justify-between'])}>
                            <Button onClick={() => handleModuleCompletion(module.id)} disabled={completedModules.includes(module.id)}>
                                {completedModules.includes(module.id) ? (
                                    <div className="flex items-center gap-2">
                                        <CheckIcon className="h-4 w-4" />
                                        Completed
                                    </div>
                                ) : (
                                    "Complete"
                                )}
                            </Button>
                            {/*{completedModules.includes(module.id) && <Badge variant="secondary">Completed</Badge>}*/}
                            <div className={classes([completedModules.includes(module.id) ? 'text-gray-500' : 'text-green-500'])}>{module.reward} PC</div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}

function CheckIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M20 6 9 17l-5-5" />
        </svg>
    );
}


// function XIcon(props) {
//     return (
//         <svg
//             {...props}
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//         >
//             <path d="M18 6 6 18" />
//             <path d="m6 6 12 12" />
//         </svg>
//     )
// }