function storageHelper() {
  const getBool = (name) => {
    if (! sessionStorage.getItem(name)) {
      return false;
    } else {
      return (sessionStorage.getItem(name) === 'true');
    }
  };

  return { getBool }
}

export default storageHelper();