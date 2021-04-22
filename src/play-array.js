const users = [
  { id: 1, name: "子軒", money: 1 },
  { id: 2, name: "許晴", money: 3 },
  { id: 3, name: "心瑜", money: 10 },
];

// 情境題 1：把 id 是 2 的 user 的 name 改成 Winnie
// users.map((u) => (u.id === 2 ? { ...u, name: "Winnie" } : u));

// 情境題 2：把 id 是 1 的 user 拿掉
// const newUsers = [];
// for (let i = 0; i < users.length; i++) {
//   users[i].id !== 1 && newUsers.push(user);
// }

const newUsers = users.filter((user) => user.id !== 1);

// 情境題 3：把每個 user 的錢加總
let sum = 0;
for (let i = 0; i < users.length; i++) {
  sum += users[i].money;
}

const sum = users.reduce((sum, user) => {
  const { money } = user;

  // if (user.id === 1) {
  //   return sum
  // }

  return sum + money;
}, 0);

// [1, 2, 3].reduce((sum, num) => sum + num)

// 情境題 4：users 做成 name money object
/**
 * {
 *   '子軒': 1,
 *   '許晴': 3,
 *   '心瑜': 10
 * }
 */

let moneySheet = {};

for (let i = 0; i < users.length; i++) {
  const { name, money } = users[i];
  moneySheet = { ...moneySheet, [name]: money };
}

const moneySheet = users.reduce(
  (moneySheet, { name, money }) => ({ ...moneySheet, [name]: money }),
  {}
);

// 情境題 5：把 users 的名字弄成一個字串，用逗號分隔，像是 'Andy,Ben,Cathy'

// let names = ''

// for (let i = 0; i < users.length; i++){
//     const { name } = users[i]
//     names = (i === 0) ? name : `${names},${name}`
// }

users.map(({ name }) => name).join(",");

// 情境題 6：把錢多的排前面
users.sort((a, b) => b.money - a.money);

users.some((user) => user.money > 5);
users.every((user) => user.money < 3);

const me = users.find((user) => user.name === "子軒");
const myUserIndex = users
  .findIndex((user) => user.name === "子軒")

  [("子軒", "心瑜")].includes("陳映達"); // false
users.includes({ id: 1, name: "子軒", money: 1 }); // false

// const a = 'yes'
// // b { yes: 123 }
// const b = { [a]: 123 }

// false && true; // false
// false && {}; // false
// true && {}; // {}

// // 如果 exp1 可以被轉換 true，就回傳 exp2，不然就回傳 exp1
// 1 && 0 // 0
// '' && 0 // 0
// ({}) && 0 // 0
// [] && 0 // 0
// (() => {}) && 0 // 0

// // falsy
// 0 && 1 // 0
// null && 1 // null
// undefined && 1 // undefined
// NaN && 0 // NaN

// const btn = document.querySelector('#my-btn')
// btn.aaddEventListener('click', () => {})

// $('#my-btn').on('click', () => {})
