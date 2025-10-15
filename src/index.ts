import express, { json } from 'express'
const app = express()
const port = 3000



var products = [
  { id: 1, name: 'shoes', price: 50, category: 'footwear' },
  { id: 2, name: 't-shirt', price: 80, category: 'clothes' },
  { id: 3, name: 'jeans', price: 75, category: 'clothes' },
  { id: 4, name: 'neckalce', price: 200, category: 'accessories' },
]

app.use(express.json())
// fetch products
app.get('/app/products', (req, res) => {
  const requestedcategory = req.query.category
  if (requestedcategory) {
    res.json(products.filter(products => products.category === requestedcategory))
  } else {
    res.json(products)
  }
})

// create products 
app.post('/api/products', (req, res) => {
  console.log(req.body)
   var lastid = products.length

   const productWithId = { id: lastid + 1, ...req.body };

  products.push(productWithId);

  res.json({
    message: 'Product has been created',
    product: productWithId,
  });

})

// Update products

app.patch('/api/products/:name', (req, res) => {
  const name = req.params.name
  const data = req.body
  products = products.map(product => {
    if (product.name === name) {
      const newproduct = {
        id: data.id || product.id,
        name: data.name || product.name,
        price: data.price || product.price,
        category: data.category || product.category
      }
      return newproduct;
    } else {
      return product;
    }
  })
  res.json({ Message: `product ${name} has been updated` })
})

// delete products 

app.delete('/api/products/:id', (req, res) => {
  console.log(req.params)
 const id = Number(req.params.id);
  products = products.filter(product => product.id !== id)
  res.json({ message: `product ${id} has been deleted` })
})

app.listen(port, () => {
  console.log(`server listening on port ${port}`)
})
