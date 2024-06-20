<template>
  <q-layout
    view="hHh lpR fFf"
    :style="{ minHeight: '100vh' }"
    :container="{ style: { padding: '0' } }"
  >
    <q-header style="background-color: green">
      <q-toolbar style="background-color: darkolivegreen">
        <q-toolbar-title
          class="text-white"
          style="font-weight: 900; margin-right: 1000px"
        >
          WEATHER
        </q-toolbar-title>
        <div class="current-time text-white">
          {{ currentDay }}, {{ currentDate }} {{ currentMonth }}
          {{ currentYear }} - {{ currentTime }}
        </div>

        <q-btn-dropdown label="Tugas" color="green" no-caps>
          <q-list style="min-width: 200px">
            <q-item
              v-for="tugas in tugasLinks"
              :key="tugas.id"
              clickable
              @click="openLink(tugas.url)"
              style="color: black"
            >
              {{ tugas.name }}
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page class="flex flex-center">
        <q-card
          class="q-pa-md glass-card"
          style="background: rgba(255, 255, 255, 0.1)"
        >
          <q-card-section>
            <div class="text-h6 text-center text-white">
              <strong>CUACA HARI INI KOTA ANDA</strong>
            </div>
          </q-card-section>

          <q-card-section>
            <q-input
              v-model="location"
              outlined
              placeholder="Masukkan lokasi"
              class="input-field"
              @keyup.enter="fetchWeather"
            >
              <template v-slot:append>
                <q-btn label="Cari" color="grey" @click="fetchWeather" />
              </template>
            </q-input>
          </q-card-section>

          <q-card-section v-if="weather" class="weather-info">
            <div class="text-center text-white">
              <strong>Lokasi:</strong> {{ weather.name }}
            </div>
            <div :class="temperatureClass" class="text-center">
              <strong>Temperatur:</strong> {{ weather.main.temp }}°C
            </div>
            <div class="text-center text-white">
              <strong>Deskripsi:</strong> {{ weather.weather[0].description }}
            </div>
            <div class="text-center text-white">
              <strong>Kecepatan Angin:</strong> {{ weather.windSpeed }} m/s
            </div>
            <div class="text-center text-white">
              <strong>Arah Angin:</strong> {{ weather.windDeg }}°
            </div>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>

    <q-footer
      style="background-color: darkolivegreen"
      class="text-white text-center"
    >
      &copy; 2024 WEATHER. All rights reserved.
    </q-footer>

    <video id="background-video" loop autoplay muted>
      <source src="./assets/morning-forest.1920x1080.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </q-layout>
</template>

<script>
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import axios from "axios";

export default {
  name: "App",
  setup() {
    const location = ref("");
    const weather = ref(null);
    const rightDrawerOpen = ref(false);
    const apiKey = "8a7436bc7a340da337b17310ea4fd29a";
    const currentDay = ref("");
    const currentDate = ref("");
    const currentMonth = ref("");
    const currentYear = ref("");
    const currentTime = ref("");
    const temperatureClass = ref("");

    const tugasLinks = ref([
      {
        id: 1,
        name: "Tugas Pertemuan 1",
        url: "https://raviki-projectcv.vercel.app/",
      },
      { id: 2, name: "Tugas Pertemuan 2", url: "https://tugasp2.vercel.app/" },
      { id: 3, name: "Tugas Pertemuan 3", url: "https://tugasp3.vercel.app/" },
      { id: 4, name: "Tugas Pertemuan 4", url: "https://tugasp4.vercel.app/" },
      {
        id: 5,
        name: "Tugas Pertemuan 5",
        url: "https://t5-pbk-223510215.vercel.app/",
      },
      {
        id: 6,
        name: "Tugas Pertemuan 6",
        url: "https://t6-pbk-223510215.vercel.app/",
      },
      {
        id: 7,
        name: "Tugas Pertemuan 7",
        url: "https://tugas-pertemuan7.netlify.app",
      },
    ]);

    const openLink = (url) => {
      window.open(url, "_blank");
    };

    const fetchWeather = async () => {
      try {
        if (location.value) {
          const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location.value}&appid=${apiKey}&units=metric`;
          const response = await axios.get(apiUrl);
          // Menambahkan properti kecepatan dan arah angin ke objek weather
          weather.value = {
            ...response.data,
            windSpeed: response.data.wind.speed,
            windDeg: response.data.wind.deg,
          };
        }
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
        // Handle error here, e.g., display error message to the user
      }
    };

    // Watch weather changes to update temperatureClass
    watch(weather, (newVal) => {
      if (newVal && newVal.main.temp) {
        const temp = newVal.main.temp;
        if (temp > 30) {
          temperatureClass.value = "text-red";
        } else if (temp >= 25 && temp <= 30) {
          temperatureClass.value = "text-yellow";
        } else {
          temperatureClass.value = "text-green";
        }
      }
    });

    // Update current time and date every second
    let timeIntervalId = null;

    const updateTimeAndDate = () => {
      const now = new Date();
      currentDay.value = now.toLocaleDateString("id-ID", { weekday: "long" });
      currentDate.value = now.getDate();
      currentMonth.value = now.toLocaleDateString("id-ID", { month: "long" });
      currentYear.value = now.getFullYear();
      currentTime.value = now.toLocaleTimeString("id-ID");
    };

    onMounted(() => {
      timeIntervalId = setInterval(updateTimeAndDate, 1000);
      fetchWeather();
    });

    onBeforeUnmount(() => {
      clearInterval(timeIntervalId);
    });

    return {
      location,
      weather,
      rightDrawerOpen,
      fetchWeather,
      temperatureClass,
      currentDay,
      currentDate,
      currentMonth,
      currentYear,
      currentTime,
      tugasLinks,
      openLink,
    };
  },
};
</script>

<style>
.text-red {
  color: red;
  text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black,
    1px 1px 0 black;
}

.text-yellow {
  color: yellow;
  text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black,
    1px 1px 0 black;
}

.text-green {
  color: green;
  text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black,
    1px 1px 0 black;
}

body {
  font-family: "Roboto", sans-serif;
  color: #ffffff;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-size: cover;
  background-repeat: no-repeat;
  transition: background-image 0.5s ease-in-out;
}

.background-color {
  background-color: green;
}

#background-video {
  position: fixed;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  z-index: -1;
  opacity: 0.5; /* Adjust the opacity to darken or lighten the video */
  transition: opacity 1s ease-in-out;
}

.glass-card {
  border-radius: 15px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border: 1px solid rgba(255, 255, 255, 0.18);
  transition: transform 0.2s;
}

.glass-card:hover {
  transform: scale(1.05);
}

.text-white {
  color: rgb(255, 255, 255);
}

.text-primary {
  color: #00bcd4;
}

.input-field .q-field__control {
  background: rgba(218, 218, 218, 0.2);
  border-radius: 5px;
  color: white;
}

.input-field .q-field__control:before,
.input-field .q-field__control:after {
  border-color: rgba(255, 255, 255, 0.3);
}

.input-field .q-input__inner {
  color: white;
}

.weather-info {
  margin-top: 20px;
  animation: fadeIn 1s ease-in-out;
}

.current-time {
  margin-left: auto;
  padding-right: 20px;
}

.current-date {
  margin-right: auto;
  padding-left: 20px;
}
</style>
