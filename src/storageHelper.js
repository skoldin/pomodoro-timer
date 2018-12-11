function storageHelper() {
  const setBool = (name, value) => {
    return (value === true) ? 'true' : 'false';
  };
  const getBool = (name) => {
    if (! sessionStorage.getItem(name)) {
      return false;
    } else {
      return (sessionStorage.getItem(name) === 'true');
    }
  };

  return { getBool, setBool }
}

export default storageHelper();