const extractor = {
  extractor: class {
    static extract(content) {
      // clean content from unnecesary spaces
      const cleanedContent = content.replace(/\s+/g, ` `);
      // get only v-screen directive content
      const screenDirectives = cleanedContent.match(
        /v-screen=("|'){((?!{|}).)+}("|')/g
      );
      let whitelabledClasses = "";
      if (screenDirectives !== null) {
        screenDirectives.forEach(string => {
          let valueString = string.match(/{.+}/g)[0];
          valueString = valueString
            .replace(/\s:/g, ":")
            .replace(/:\s/g, '":')
            .replace(/,\s/g, ",")
            .replace(/{\s/g, "{")
            .replace(/'/g, '"')
            // .replace(/:/g, '":')
            .replace(/{/g, '{"')
            .replace(/,/g, ',"');

          const valueObject = JSON.parse(valueString);
          const screens = Object.keys(valueObject);
          screens.forEach(screen => {
            const screenClasses = " " + valueObject[screen];
            whitelabledClasses += screenClasses.replace(/\s+/g, ` ${screen}:`);
          });
        });
      }
      // original - get all strings
      const allStrings = content.match(/[A-z0-9-:\\/]+/g);
      // prepare computed screen classes
      const whitelabledArray = whitelabledClasses.split(" ");

      allStrings.push(...whitelabledArray);

      return allStrings;
    }
  },
  extensions: ["vue"]
};
