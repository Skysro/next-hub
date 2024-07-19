const category = ['age','alone','amazing','anger','architecture','art','attitude','beauty','best','birthday','business','car','change','communication','computers','cool','courage','dad','dating','death','design','dreams','education','environmental','equality','experience','failure','faith','family','famous','fear','fitness','food','forgiveness','freedom','friendship','funny','future','god','good','government','graduation','great','happiness','health','history','home','hope','humor','imagination','inspirational','intelligence','jealousy','knowledge','leadership','learning','legal','life','love','marriage','medical','men','mom','money','morning','movies','success'];
const type = category[Math.floor(Math.random() * category.length)];

export async function fetchData() {
  try {
    const response = await fetch('https://api.api-ninjas.com/v1/quotes?category=' + type, {
      headers: {
        'X-Api-Key': 'QmQFj9rJXf0OtsFFFnoCzw==P4iYfYi0hqJGsole'
      }
    });
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const data = await response.json(); // Assign fetched data to the variable
    return data;
  } catch (error) {
    console.error('Request failed:', error);
    return null;
  }
}