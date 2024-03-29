export const coffeeMachineMesh = new Float32Array([
  // левая грань
  // левая большая
  -10, 10, -10,    //    |--/
  -10, -10, -10,   //    | /
  -10, 10, 0,      //    |/

  -10, -10, -10,   //      /|
  -10, -10, 0,     //     / |
  -10, 10, 0,      //    /__|

  // левая нижняя часть
  -10, -10, 0,     //      /|
  -10, -10, 5,     //     / |
  -10, -7, 5,      //    /__|

  -10, -7, 0,      //    |--/
  -10, -10, 0,     //    | /
  -10, -7, 5,      //    |/

  // левая верхняя часть
  -10, 10, 5,      //    |--/
  -10, 10, 0,      //    | /
  -10, 5, 0,       //    |/

  -10, 5, 0,       //      /|
  -10, 5, 5,       //     / |
  -10, 10, 5,      //    /__|

  // правая грань
  // правая центральная грань
  10, -10, -10,    //    |--/
  10, 10, -10,     //    | /
  10, 10, 0,       //    |/

  10, -10, 0,      //      /|
  10, -10, -10,    //     / |
  10, 10, 0,       //    /__|

  //правая нижняя грань
  10, -10, 5,      //      /|
  10, -10, 0,      //     / |
  10, -7, 5,       //    /__|

  10, -10, 0,      //    |--/
  10, -7, 0,       //    | /
  10, -7, 5,       //    |/

  // правая верхняя часть
  10, 10, 0,      //    |--/
  10, 10, 5,      //    | /
  10, 5, 0,       //    |/


  10, 5, 5,       //      /|
  10, 5, 0,       //     / |
  10, 10, 5,      //    /__|

  // передняя грань
  // низ
  -10, -10, 5,    //      /|
  10, -10, 5,     //     / |
  10, -7, 5,      //    /__|

  -10, -7, 5,     //    |--/
  -10, -10, 5,    //    | /
  10, -7, 5,      //    |/

  // верх

  10, 10, 5,      //   \--|
  -10, 10, 5,     //    \ |
  10, 5, 5,       //     \|

  -10, 10, 5,     //   |\
  -10, 5, 5,      //   | \
  10, 5, 5,       //   |__\

  //центр
  10, 5, 0,      //   \--|
  -10, 5, 0,     //    \ |
  10, -7, 0,     //     \|

  -10, 5, 0,      //   |\
  -10, -7, 0,     //   | \
  10, -7, 0,      //   |__\

  // вехняя планка
  -10, 5, 5,
  -10, 5, 0,
  10, 5, 0,

  10, 5, 0,
  10, 5, 5,
  -10, 5, 5,

  // нижняя планка
  -10, -7, 0,
  -10, -7, 5,
  10, -7, 0,

  10, -7, 5,
  10, -7, 0,
  -10, -7, 5,

  // зад
  10, -10, -10,
  -10, -10, -10,
  10, 10, -10,

  -10, -10, -10,
  -10, 10, -10,
  10, 10, -10,


  // крышка
  -10, 10, -10,
  -10, 10, 5,
  10, 10, 5,

  10, 10, -10,
  -10, 10, -10,
  10, 10, 5,

  // дно
  -10, -10, 5,
  -10, -10, -10,
  10, -10, 5,

  -10, -10, -10,
  10, -10, -10,
  10, -10, 5,
])
