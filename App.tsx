
import React, { useState, useRef, useCallback } from 'react';
import { CVData, Experience, Education, Certification } from './types';
import CVForm from './components/CVForm';
import CVPreview from './components/CVPreview';
import { downloadAsHtml, downloadAsPdf, downloadAsJSON } from './services/downloadService';

const initialCVData: CVData = {
    name: "David Lugo",
    professionalTitle: "Desarrollador de Software | Especialista en IA y Backend",
    contact: {
        email: "4dlj1995@gmail.com",
        phone: "+52 55 1234 5678",
        linkedin: "https://www.linkedin.com/in/david-ljz/"
    },
    summary: "Desarrollador de software senior con 5 años de experiencia en el diseño, desarrollo y despliegue de soluciones backend robustas y escalables, con un enfoque reciente en la integración de Inteligencia Artificial. Experto en Python, PHP y React, con un historial probado en la optimización de procesos, automatización y creación de APIs complejas. Busco aplicar mis habilidades para impulsar la innovación en un entorno dinámico.",
    skills: {
        technical: "Python, PHP, JavaScript (ES6+), Go, SQL, FastAPI, Laravel, React, Vue.js, Node.js, PostgreSQL, MySQL, MongoDB, Docker, Git, CI/CD, Arquitectura Limpia, DDD, Microservicios, APIs RESTful, ATS Optimization, Generative AI, Procesamiento de Lenguaje Natural (NLP), Machine Learning Basics",
        soft: "Comunicación Efectiva, Resolución de Problemas, Trabajo en Equipo, Liderazgo, Adaptabilidad, Pensamiento Crítico"
    },
    experience: [
        {
            id: 'exp1',
            companyName: "Desconocido",
            jobTitle: "Desarrollador de Software Senior",
            datesLocation: "5 años de experiencia",
            responsibilities: "Desarrollador de software senior con 5 años de experiencia en el diseño, desarrollo y despliegue de soluciones backend robustas y escalables, con un enfoque reciente en la integración de Inteligencia Artificial."
        }
    ],
    education: [
        {
            id: 'edu1',
            degreeTitle: "Ingeniería en Sistemas Computacionales",
            institutionName: "Universidad Virtual del Estado de Guanjuato",
            datesLocation: "Agosto 2023 | México"
        }
    ],
    certifications: [
        { id: 'cert1', name: "EF SET English Certificate 68/100 (C1 Advanced) - 2023" },
    ]
};

const App: React.FC = () => {
    const [cvData, setCvData] = useState<CVData>(initialCVData);
    const cvPreviewRef = useRef<HTMLDivElement>(null);

    const handleDownloadPdf = useCallback(() => {
        if (cvPreviewRef.current) {
            downloadAsPdf(cvPreviewRef.current, cvData.name);
        }
    }, [cvData.name]);

    const handleDownloadHtml = useCallback(() => {
        if (cvPreviewRef.current) {
            downloadAsHtml(cvPreviewRef.current, cvData.name);
        }
    }, [cvData.name]);

    const handleDownloadJson = useCallback(() => {
        if (cvPreviewRef.current) {
            downloadAsJSON(cvData)
        }
    }, [cvData.name])

    return (
        <div className="bg-gray-100 min-h-screen text-gray-800">
            <header className="bg-white shadow-md p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-800">Generador de CV</h1>
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={handleDownloadHtml}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center space-x-2"
                        >
                            <span>Descargar HTML</span>
                        </button>
                        <button
                            onClick={handleDownloadPdf}
                            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center space-x-2"
                        >
                            <span>Descargar PDF</span>
                        </button>

                        <button
                            onClick={handleDownloadJson}
                            className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center space-x-2"
                        >
                            <span>Descarga JSON</span>
                        </button>
                    </div>
                </div>
            </header>
            <main className="container mx-auto p-4 lg:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="bg-white p-6 rounded-xl shadow-lg">
                    <CVForm cvData={cvData} setCvData={setCvData} />
                </div>
                <div className="bg-gray-200 p-4 lg:p-8 rounded-xl shadow-inner">
                    <div className="shadow-lg rounded-lg overflow-hidden">
                       <CVPreview ref={cvPreviewRef} data={cvData} />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default App;