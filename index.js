function mapBreakpointsOnClasses(dirValue, origClasses = "") {
  const screens = Object.keys(dirValue);
  const regex = /\s+/g;
  screens.forEach(screen => {
    const screenClasses = " " + dirValue[screen];
    origClasses += screenClasses.replace(regex, ` ${screen}:`);
  });
  return origClasses;
}

export const server = (node, dir) => {
  node.data.class += mapBreakpointsOnClasses(dir.value);
};

export const client = {
  bind(el, dir) {
    el.className += mapBreakpointsOnClasses(dir.value);
  },
  update(el, dir, vnode) {
    const classes = vnode.data.staticClass + " " + vnode.data.class;
    el.className = mapBreakpointsOnClasses(dir.value, classes);
  }
};
