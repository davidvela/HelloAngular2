
export const EMPLOYEES: any[] = [
  {
    id: "4815",
    skills: [ {
      primary: true,
      //category: SkillCategory.PRODUCTS,
      name: "JEE 6", // Oracle.Oracle JAVA/2EE.JEE 6
      experience: "3", // years
     // level: SkillLevel.INITIATE,
      lastYearUsed: 2017
    } ,{
      primary: true,
      //category: SkillCategory.PRODUCTS,
      name: "Java EE (J2EE)", // Oracle.Oracle JAVA/2EE.Java EE (J2EE) 
      experience: "3", // years
      //level: SkillLevel.INITIATE,
      lastYearUsed: 2017
    } ,{
      primary: false,
     // category: SkillCategory.PRODUCTS,
      name: "SPRING", // Oracle.Oracle JAVA/2EE.SPRING 
      experience: "1", // years
     //level: SkillLevel.INITIATE,
      lastYearUsed: 2016
    } ,
    ],
    location: "Berlin",
    availability: 50,
    availableFrom: new Date(2017, 4, 28)
  }
]