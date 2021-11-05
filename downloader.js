var run = async function () {
  const dataURL = "https://data.jsdelivr.com/v1/package/gh/HillHeadism/HKTiles@0.0.1/flat?"
  const sourceBaseURL = "https://cdn.jsdelivr.net/gh/HillHeadism/HKTiles@0.0.1"
  var list = await fetch(dataURL).then((res) => res.json())
  var urlList = list.files.map((link) => `${sourceBaseURL}${link['name']}`)
  var resourceLength = urlList.length;
  var cache = await caches.open('HillHeadism_Tiles');
  for (let i = 0; i < resourceLength; i += 200) {
    const chunk = urlList.slice(i, i + 200);
    await cache.addAll(chunk).then(()=>{
      self.postMessage({ kind: "PROGRESS", progress: 10000 / resourceLength});
    })
  }
}();
run.then(() => self.postMessage({ kind: "SUCCESS" }))