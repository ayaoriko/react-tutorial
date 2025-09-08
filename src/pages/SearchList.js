import { useState } from 'react';
export default function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}


/*** メインコンポーネント ***/
/*** 土台となるソートテーブルの枠組み **/
function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
  
  // 状態はできるだけ親で管理したいけど、長いのでカスタムフック
  const { productList, totalCount, toggleProduct } = useProductList(products);
  
  return (
<div>
  <SearchBar 
    filterText={filterText} 
    inStockOnly={inStockOnly}
    onFilterTextChange={setFilterText}
    onInStockOnlyChange={setInStockOnly} />
    
  <ProductTable 
    products={productList}
    filterText={filterText}
    inStockOnly={inStockOnly}
    onToggle={toggleProduct}  />
    
    <ProductTotalArea
     totalCount={totalCount}
    />
    
</div>
  );
}

/*** カスタムフック ***/
function useProductList(initialProducts) {
  
   // 在庫リストを管理するために、products を state にコピーして管理する
  // ...p → 元のオブジェクトの中身を全部コピー
  // initialStocked: p.stocked → 新しいプロパティ initialStocked を追加して、元々の在庫数を保持
  const [productList, setProductList] = useState(
    initialProducts.map(p => ({ ...p, initialStocked: p.stocked }))
  );
  const [totalCount, setTotalCount] = useState(0);

  
  // 合計値 & 在庫を更新
  const toggleProduct = (price, checked, productName) => {
    // 合計値
    setTotalCount(prev => checked ? prev + price : prev - price);
    // 在庫
    setProductList(prev =>
      prev.map(p =>
        p.name === productName
          ? { ...p, stocked: checked ? p.stocked - 1 : p.stocked + 1 }
          : p
      )
    );
  };

  return { productList, totalCount, toggleProduct };
}

/*** テーブルを出力していく ***/
function ProductTable({ products, filterText, inStockOnly, onToggle}) {
  const rows = [];
  // Set()は配列に似ているけど、同じ値を重複して持てない配列
  const seenCategories = new Set();
  
  // 事前にソートすることで、カテゴリーの順番がバラバラでもOKにする
  
  // const arr = [3, 1, 2];
  // const sorted = [...arr].sort(); // arrはそのまま、sortedだけ並び替えられる
  // .sort((a, b) => {...})で全部の商品のaとbを比較するところまでやってくれる
  const sortedProducts = [...products].sort((a, b) => {
    if (a.category === b.category) {
      // a.name.localeCompare(b.name)文字列を辞書順で比較する便利メソッド
      // カテゴリが同じ場合は名前の文字列順で並べます。
      return a.name.localeCompare(b.name);
    }
    // カテゴリが違う場合はカテゴリ名の文字列順で並べます。
    return a.category.localeCompare(b.category);
  });

  sortedProducts.forEach((product) => {
    // フィルター条件に合わない商品はスキップ
    if (
      product.name.toLowerCase().indexOf(
        filterText.toLowerCase()
      ) === -1
    ) {
      return;
    }
    if (inStockOnly && product.stocked ===0) {
      return;
    }
    
    if (!seenCategories.has(product.category)) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />
      );
      seenCategories.add(product.category);
    }
    rows.push(
      <ProductRow
        product={product}
        onToggle={onToggle}
        key={product.name} />
    );
  });
  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Stock</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="4">
        {category}
      </th>
    </tr>
  );
}

function ProductRow({ product, onToggle }) {
  return (
    <tr style={{ color: product.stocked !== 0 ? 'black': 'red' }}>
      <td><ProductRowCheckBox product={product}  onToggle={onToggle} /></td>
      <td>{product.name}</td>
      <td>残{product.stocked}</td>
      <td>{product.price}円</td>
    </tr>
  );
}

function ProductRowCheckBox({ product, onToggle   }) {
  const showCheckbox = product.initialStocked !== 0;
  if (!showCheckbox) return null;
  
  return (
   <input 
          type="checkbox" 
          value={product.price}
            onChange={(e) => {
                const checked = e.target.checked;
                const price = Number(product.price);
                onToggle(price, checked, product.name);
              }
            }
           />
          
  );
}

function SearchBar({ 
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange
  }) {
  return (
    <form>
      <input 
        type="text" 
        value={filterText} placeholder="Search..." 
        onChange={(e) => onFilterTextChange(e.target.value)} />
      <label>
        <input 
          type="checkbox" 
          checked={inStockOnly} 
          onChange={(e) => onInStockOnlyChange(e.target.checked)} />
        {' '}
        Only show products in stock
      </label>
    </form>
  );
}

function ProductTotalArea({ 
  totalCount
  }) {
    return (
      <p> 合計:{totalCount}円</p>
    );
}

const PRODUCTS = [
  {category: "Fruits", price: 100, stocked: 6, name: "Apple"},
  {category: "fish", price: 400, stocked: 0, name: "Maguro"},
  {category: "Fruits", price: 200, stocked: 2, name: "Dragonfruit"},
  {category: "Vegetables", price: 300, stocked:3, name: "Spinach"},
  {category: "Fruits", price: 500, stocked: 6, name: "Passionfruit"},
  {category: "Vegetables", price: "400", stocked: 0, name: "Pumpkin"},
   {category: "fish", price: 300, stocked: 1, name: "sake"},
  {category: "Vegetables", price: 600, stocked: 8, name: "Peas"},
  {category: "Vegetables", price: 400, stocked: 7, name: "Sale"},
];