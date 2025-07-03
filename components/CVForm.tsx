
import React from 'react';
import { CVData, Experience, Education, Certification } from '../types';
import { PlusIcon } from './icons/PlusIcon';
import { TrashIcon } from './icons/TrashIcon';

interface CVFormProps {
    cvData: CVData;
    setCvData: React.Dispatch<React.SetStateAction<CVData>>;
}

type ArrayKey = 'experience' | 'education' | 'certifications';

const CVForm: React.FC<CVFormProps> = ({ cvData, setCvData }) => {

    const handleBasicChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setCvData(prev => ({ ...prev, [name]: value }));
    };

    const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCvData(prev => ({ ...prev, contact: { ...prev.contact, [name]: value } }));
    };

    const handleSkillsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setCvData(prev => ({ ...prev, skills: { ...prev.skills, [name]: value } }));
    };
    
    const handleArrayChange = <T extends { id: string }>(
        key: ArrayKey,
        id: string,
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setCvData(prev => ({
            ...prev,
            [key]: (prev[key] as T[]).map(item =>
                item.id === id ? { ...item, [name]: value } : item
            ),
        }));
    };

    const addArrayItem = <T extends { id: string }>(key: ArrayKey, newItem: T) => {
        setCvData(prev => ({ ...prev, [key]: [...(prev[key] as T[]), newItem] }));
    };

    const removeArrayItem = (key: ArrayKey, id: string) => {
        setCvData(prev => ({ ...prev, [key]: (prev[key] as { id: string }[]).filter(item => item.id !== id) }));
    };

    const inputClasses = "w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow duration-200";
    const textareaClasses = `${inputClasses} min-h-[100px] resize-y`;
    const fieldsetClasses = "border border-gray-200 p-4 rounded-lg mb-6";
    const legendClasses = "text-lg font-semibold text-gray-700 px-2";
    const buttonClasses = "text-white font-bold py-2 px-3 rounded-lg transition-colors duration-300 flex items-center justify-center";
    
    return (
        <form className="space-y-6">
            <fieldset className={fieldsetClasses}>
                <legend className={legendClasses}>Información Personal</legend>
                <div className="space-y-4 mt-2">
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Nombre Completo</label>
                        <input type="text" name="name" value={cvData.name} onChange={handleBasicChange} className={inputClasses} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Título Profesional</label>
                        <input type="text" name="professionalTitle" value={cvData.professionalTitle} onChange={handleBasicChange} className={inputClasses} />
                    </div>
                </div>
            </fieldset>

            <fieldset className={fieldsetClasses}>
                <legend className={legendClasses}>Contacto</legend>
                 <div className="space-y-4 mt-2">
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                        <input type="email" name="email" value={cvData.contact.email} onChange={handleContactChange} className={inputClasses} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Teléfono</label>
                        <input type="tel" name="phone" value={cvData.contact.phone} onChange={handleContactChange} className={inputClasses} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Perfil de LinkedIn (URL completa)</label>
                        <input type="url" name="linkedin" value={cvData.contact.linkedin} onChange={handleContactChange} className={inputClasses} />
                    </div>
                </div>
            </fieldset>

            <fieldset className={fieldsetClasses}>
                <legend className={legendClasses}>Resumen Profesional</legend>
                <div className="mt-2">
                    <textarea name="summary" value={cvData.summary} onChange={handleBasicChange} className={textareaClasses} />
                </div>
            </fieldset>

            <fieldset className={fieldsetClasses}>
                <legend className={legendClasses}>Habilidades</legend>
                <div className="space-y-4 mt-2">
                     <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Técnicas (separadas por coma)</label>
                        <textarea name="technical" value={cvData.skills.technical} onChange={handleSkillsChange} className={textareaClasses} />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Blandas (separadas por coma)</label>
                        <textarea name="soft" value={cvData.skills.soft} onChange={handleSkillsChange} className={textareaClasses} />
                    </div>
                </div>
            </fieldset>
            
            <fieldset className={fieldsetClasses}>
                <legend className={legendClasses}>Experiencia Laboral</legend>
                <div className="space-y-6 mt-2">
                    {cvData.experience.map((exp, index) => (
                        <div key={exp.id} className="border border-gray-200 p-4 rounded-md relative">
                           <button type="button" onClick={() => removeArrayItem('experience', exp.id)} className={`${buttonClasses} bg-red-500 hover:bg-red-600 absolute -top-3 -right-3 h-8 w-8`}><TrashIcon /></button>
                           <div className="space-y-3">
                                <input type="text" name="jobTitle" placeholder="Puesto" value={exp.jobTitle} onChange={(e) => handleArrayChange<Experience>('experience', exp.id, e)} className={inputClasses} />
                                <input type="text" name="companyName" placeholder="Empresa" value={exp.companyName} onChange={(e) => handleArrayChange<Experience>('experience', exp.id, e)} className={inputClasses} />
                                <input type="text" name="datesLocation" placeholder="Fechas y Lugar" value={exp.datesLocation} onChange={(e) => handleArrayChange<Experience>('experience', exp.id, e)} className={inputClasses} />
                                <textarea name="responsibilities" placeholder="Responsabilidades (una por línea)" value={exp.responsibilities} onChange={(e) => handleArrayChange<Experience>('experience', exp.id, e)} className={textareaClasses} />
                           </div>
                        </div>
                    ))}
                    <button type="button" onClick={() => addArrayItem<Experience>('experience', {id: Date.now().toString(), jobTitle:'', companyName:'', datesLocation:'', responsibilities:''})} className={`${buttonClasses} bg-blue-500 hover:bg-blue-600 w-full`}>
                        <PlusIcon /> Añadir Experiencia
                    </button>
                </div>
            </fieldset>

            <fieldset className={fieldsetClasses}>
                <legend className={legendClasses}>Educación</legend>
                 <div className="space-y-6 mt-2">
                    {cvData.education.map((edu, index) => (
                        <div key={edu.id} className="border border-gray-200 p-4 rounded-md relative">
                           <button type="button" onClick={() => removeArrayItem('education', edu.id)} className={`${buttonClasses} bg-red-500 hover:bg-red-600 absolute -top-3 -right-3 h-8 w-8`}><TrashIcon /></button>
                           <div className="space-y-3">
                                <input type="text" name="degreeTitle" placeholder="Título Obtenido" value={edu.degreeTitle} onChange={(e) => handleArrayChange<Education>('education', edu.id, e)} className={inputClasses} />
                                <input type="text" name="institutionName" placeholder="Institución" value={edu.institutionName} onChange={(e) => handleArrayChange<Education>('education', edu.id, e)} className={inputClasses} />
                                <input type="text" name="datesLocation" placeholder="Fechas y Lugar" value={edu.datesLocation} onChange={(e) => handleArrayChange<Education>('education', edu.id, e)} className={inputClasses} />
                           </div>
                        </div>
                    ))}
                    <button type="button" onClick={() => addArrayItem<Education>('education', {id: Date.now().toString(), degreeTitle:'', institutionName:'', datesLocation:''})} className={`${buttonClasses} bg-blue-500 hover:bg-blue-600 w-full`}>
                        <PlusIcon /> Añadir Educación
                    </button>
                </div>
            </fieldset>

            <fieldset className={fieldsetClasses}>
                <legend className={legendClasses}>Certificaciones</legend>
                <div className="space-y-6 mt-2">
                    {cvData.certifications.map((cert, index) => (
                        <div key={cert.id} className="flex items-center space-x-2">
                            <input type="text" name="name" placeholder="Nombre de la Certificación" value={cert.name} onChange={(e) => handleArrayChange<Certification>('certifications', cert.id, e)} className={inputClasses} />
                            <button type="button" onClick={() => removeArrayItem('certifications', cert.id)} className={`${buttonClasses} bg-red-500 hover:bg-red-600 h-10 w-10 flex-shrink-0`}><TrashIcon /></button>
                        </div>
                    ))}
                    <button type="button" onClick={() => addArrayItem<Certification>('certifications', {id: Date.now().toString(), name:''})} className={`${buttonClasses} bg-blue-500 hover:bg-blue-600 w-full`}>
                        <PlusIcon /> Añadir Certificación
                    </button>
                </div>
            </fieldset>
        </form>
    );
};

export default CVForm;