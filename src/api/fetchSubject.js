const fetchSubject = async string => {
  return await fetch(`https://swapi.co/api/${string}/`);
};

export default fetchSubject;
