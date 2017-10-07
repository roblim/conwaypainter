// stabilizes to static scene

newState() {
  const heads = this.getHeadcount();
  let newState;
  switch(this.state) {
    case 0:
      if (heads === 4) {
        newState = 1;} else {
          newState = 0;
        }
      break;
    case 1:
      switch(heads) {
        case 1:
          newState = 2;
          break;
        case 2:
          newState = 2;
          break;
        case 3:
          newState = 1;
          break;
        case 4:
          newState = 1;
          break;
        case 6:
          newState = 0;
          break;
        default:
          newState = 0;
          break;
        };
      break;
    case 2:
      switch(heads) {
        case 1:
          newState = 1;
          break;
        case 2:
          newState = 1;
          break;
        case 3:
          newState = 1;
          break;
        case 4:
          newState = 1;
          break;
        default:
          newState = 0;
          break;
      };
      break;
  };
  return newState;
}
