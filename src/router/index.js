import { createRouter, createWebHistory } from "vue-router";

// Import halaman-halaman tugas dari pertemuan 1 hingga 7
import Tugas1 from "./views/Tugas1.vue"; // Ganti dengan path yang sesuai
import Tugas2 from "./views/Tugas2.vue"; // Ganti dengan path yang sesuai
import Tugas3 from "./views/Tugas3.vue"; // Ganti dengan path yang sesuai
import Tugas4 from "./views/Tugas4.vue"; // Ganti dengan path yang sesuai
import Tugas5 from "./views/Tugas5.vue"; // Ganti dengan path yang sesuai
import Tugas6 from "./views/Tugas6.vue"; // Ganti dengan path yang sesuai
import Tugas7 from "./views/Tugas7.vue"; // Ganti dengan path yang sesuai

const routes = [
  { path: "/tugas/1", component: Tugas1 },
  { path: "/tugas/2", component: Tugas2 },
  { path: "/tugas/3", component: Tugas3 },
  { path: "/tugas/4", component: Tugas4 },
  { path: "/tugas/5", component: Tugas5 },
  { path: "/tugas/6", component: Tugas6 },
  { path: "/tugas/7", component: Tugas7 },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
