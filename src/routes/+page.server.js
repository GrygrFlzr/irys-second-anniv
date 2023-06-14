import testdata from "$lib/testdata/timeline-test-data.json"

/** @type {import('./$types').PageServerLoad} */
/*
must return a list of objects with the following schema:
{
  date: <unix timestamp number> / <Date object>,
  title: <string>,
  photo: <string>,
  content: <string>
}
*/
// TODO: Write up to actual CMS as opposed to testdata.
export async function load() {
    let data = [];
    for(var i = 0; i < testdata.length; i++) {
        data.push({
            date: new Date(testdata[i].timestamp * 1000),
            title: testdata[i].title,
            photo: testdata[i].photo,
            content: testdata[i].content
        });
    }

    data.sort((a, b) => {
        a.date.valueOf() - b.date.valueOf()
    });

    return {
        data: data
    };
}