
import React, { forwardRef } from 'react';
import { CVData } from '../types';

interface CVPreviewProps {
    data: CVData;
}

const CVPreview = forwardRef<HTMLDivElement, CVPreviewProps>(({ data }, ref) => {

    const renderList = (text: string) => {
        if(!text) return null;
        return text.split('\n').map((item, index) => (
            <li key={index}>{item}</li>
        ));
    };

    const renderCommaList = (text: string) => {
        if(!text) return null;
        return text.split(',').map(item => item.trim()).filter(item => item).map((item, index) => (
            <li key={index}>{item}</li>
        ));
    }

    return (
        <div ref={ref} id="cv-container" className="cv-container font-sans text-gray-800">
            <header className="text-center mb-8">
                {data.name && <h1 className="candidate-name">{data.name}</h1>}
                {data.professionalTitle && <p className="professional-title">{data.professionalTitle}</p>}
                <div className="flex justify-center items-center flex-wrap space-x-4 text-gray-700 text-sm">
                    {data.contact.email && <span>{data.contact.email}</span>}
                    {data.contact.email && data.contact.phone && <span>|</span>}
                    {data.contact.phone && <span>{data.contact.phone}</span>}
                    {(data.contact.email || data.contact.phone) && data.contact.linkedin && <span>|</span>}
                    {data.contact.linkedin && <a href={data.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{data.contact.linkedin.replace('https://www.','')}</a>}
                </div>
            </header>

            {data.summary && <section className="mb-8">
                <h2 className="section-title">Resumen Profesional</h2>
                <p className="summary-text whitespace-pre-wrap">{data.summary}</p>
            </section>}

            {(data.skills.technical || data.skills.soft) && <section className="mb-8">
                <h2 className="section-title">Habilidades</h2>
                <div className="text-gray-700">
                    {data.skills.technical && <>
                        <h3 className="font-semibold mb-2">Habilidades Técnicas:</h3>
                        <ul className="list-disc pl-5 mb-4">
                            {renderCommaList(data.skills.technical)}
                        </ul>
                    </>}
                    {data.skills.soft && <>
                        <h3 className="font-semibold mb-2">Habilidades Blandas:</h3>
                        <ul className="list-disc pl-5">
                            {renderCommaList(data.skills.soft)}
                        </ul>
                    </>}
                </div>
            </section>}

            {data.experience.length > 0 && <section className="mb-8">
                <h2 className="section-title">Experiencia Laboral</h2>
                {data.experience.map(exp => (
                    <div key={exp.id} className="mb-6">
                        <h3 className="job-title">{exp.jobTitle}</h3>
                        <p className="company-name">{exp.companyName}</p>
                        <p className="dates-location">{exp.datesLocation}</p>
                        <ul className="list-disc pl-5 text-gray-700">
                           {renderList(exp.responsibilities)}
                        </ul>
                    </div>
                ))}
            </section>}

            {data.education.length > 0 && <section className="mb-8">
                <h2 className="section-title">Educación</h2>
                {data.education.map(edu => (
                    <div key={edu.id} className="mb-6">
                        <h3 className="degree-title">{edu.degreeTitle}</h3>
                        <p className="institution-name">{edu.institutionName}</p>
                        <p className="dates-location">{edu.datesLocation}</p>
                    </div>
                ))}
            </section>}
            
            {data.certifications.length > 0 && <section>
                <h2 className="section-title">Certificaciones</h2>
                 <ul className="list-disc pl-5 text-gray-700">
                    {data.certifications.map(cert => (
                       <li key={cert.id}>{cert.name}</li>
                    ))}
                </ul>
            </section>}
        </div>
    );
});

CVPreview.displayName = 'CVPreview';
export default CVPreview;