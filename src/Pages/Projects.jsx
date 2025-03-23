import React from 'react';

const projects = [
    {
        id: 1,
        title: "Capacity Building for College Faculty in Newly Merged Districts",
        description: "Capacity building for college faculty in NMDs is an umbrella project proposed to provide opportunities for college teachers to enrich their teaching experience by enhancing their qualifications and through professional training programs."
    },
    {
        id: 2,
        title: "Introduction of BS Program in Colleges in all Tribal Districts",
        description: "The Higher Education department deems it necessary to replace the older system with the new one i.e. introduction of 4-year degree classes in the colleges to make the degree compatible with international standards and market needs.The project is extremely significant in its nature as it has to be seen in the broader spectrum schemes of higher education in Accelerated Implementation Program (AIP). The activities proposed in this scheme are in relation with other schemes of the AIP for higher education which in consolidation makes an overarching and all-embracing program for NMDs."
    },
    {
        id: 3,
        title: "Provision of Staff to Existing Colleges (Commerce + General)",
        description: "To fulfill the staff deficiency and ensure better service delivery and as a result increase the enrollment and produce quality graduates. To obtain maximum benefit from the existing higher educational institutions in NMAs."
    },
    {
        id: 4,
        title: "Provision of Stipends and Scholarships to Students of Newly Merged Districts",
        description: "The project aims at achieving the standards of higher education at par with global academia by providing opportunities of excellence in higher education to the socio-economically challenged students of Newly Merged Tribal Districts (NMTDs).Higher Education Department, in the wake of merger of Tribal Districts into Khyber Pakhtunkhwa province, is determined to raise literacy in higher education drastically by providing overseas and indigenous scholarships to the students of NMTDs in order to uplift socio-economical status of the people of NMTDs."
    },
    {
        id: 5,
        title: "Strengthening of BS Program in Newly Merged Districts",
        description: "To strengthen BS 4-Year Degree Program in Government colleges of Newly Merged Tribal Districts (NMTDs) in replacement of conventional BA/BSC 2-Year degree program by providing support for Science laboratory development, digital language laboratory, Plant and Machinery, Performance Grant, Research grant and Learning Management System. The Projects Objectives are related to sectoral objectives as Higher Education sector has initiated gradual phasing out of BA/BSC and MA/MSC programs from government colleges by introducing BS 4-Year degree programs and Associate Degree Programs in compliance to National Education Policy and various policy decisions issued by Higher Education Commission (HEC)."
    },

];

function Projects() {
    return (
        <div className="max-w-8xl mx-auto mt-10 ">
            <h2 className="text-center text-2xl font-bold mb-6">Project Management Unit: Ongoing Projects</h2>
            {projects.map((project) => (
                <div key={project.id} className="bg-green-100 p-6 rounded-lg shadow-md mb-4 flex items-start m-8 hover:shadow-lg transition duration-300">
                    <div className="w-8 h-8 bg-primary p-6 rounded-full text-white flex items-center justify-center text-lg font-bold mr-4">
                        {project.id}
                    </div>
                    <div>
                        <h3 className="text-secondary font-semibold text-3xl">{project.title}</h3>
                        <p className="text-gray-700 mt-2">{project.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Projects;
