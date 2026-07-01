import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  personalInfo,
  socialLinks,
  heroContent,
  aboutContent,
  skillsContent,
  technicalSkills,
  contentCreation,
  leadershipList,
  internshipsList,
  softSkillsList,
  projects as initialProjects,
  certificates as initialCertificates,
  education,
  footerContent
} from '../data/portfolioData';

const DataContext = createContext();

export function useData() {
  return useContext(DataContext);
}

const generateId = () => Math.random().toString(36).substring(2, 9);

export function DataProvider({ children }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const localData = localStorage.getItem('portfolio_data');
      if (localData) {
        try {
          setData(JSON.parse(localData));
        } catch (e) {
          console.error("Failed to parse local data", e);
          initializeData();
        }
      } else {
        initializeData();
      }
    } catch (e) {
      console.error("Critical DataContext Error:", e);
      setError(e.toString());
    }
  }, []);

  const initializeData = () => {
    try {
      const newProjects = initialProjects.map((p, index) => ({
        ...p,
        id: p.id || generateId(),
        showProject: true,
        order: index,
      }));

      let newSkills = [];
      technicalSkills.categories.forEach((cat, catIdx) => {
        cat.skills.forEach((skill, skillIdx) => {
          newSkills.push({
            id: generateId(),
            name: skill.name,
            percentage: skill.level,
            category: cat.title.replace(' ⭐', ''),
            icon: '', 
            showSkill: true,
            order: catIdx * 100 + skillIdx,
          });
        });
      });

      const newCertificates = initialCertificates.featured.map((c, index) => ({
        ...c,
        id: generateId(),
        showCertificate: true,
        order: index,
      }));

      const newExperience = internshipsList.map((exp, index) => ({
        ...exp,
        id: generateId(),
        showExperience: true,
        order: index,
      }));

      const newLeadership = leadershipList.map((l, index) => ({
        ...l,
        id: generateId(),
        showLeadership: true,
        order: index,
      }));

      const newSettings = {
        personalInfo,
        socialLinks,
        heroContent,
        aboutContent,
        footerContent,
      };

      const initialSchema = {
        projects: newProjects,
        skills: newSkills,
        certificates: newCertificates,
        experience: newExperience,
        leadership: newLeadership,
        settings: newSettings,
      };

      localStorage.setItem('portfolio_data', JSON.stringify(initialSchema));
      setData(initialSchema);
    } catch (e) {
      console.error("Failed to initialize data:", e);
      setError(e.toString());
    }
  };

  const updateData = (collectionName, newCollectionData) => {
    setData((prev) => {
      const updated = { ...prev, [collectionName]: newCollectionData };
      localStorage.setItem('portfolio_data', JSON.stringify(updated));
      return updated;
    });
  };

  if (error) {
    return <div style={{ color: 'red', padding: '20px', background: 'black', height: '100vh' }}>Data Context Error: {error}</div>;
  }

  if (!data) {
    return <div style={{ color: 'white', padding: '20px', background: 'black', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading Data...</div>;
  }

  return (
    <DataContext.Provider value={{ data, updateData }}>
      {children}
    </DataContext.Provider>
  );
}
