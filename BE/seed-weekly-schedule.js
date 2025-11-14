/**
 * Seed Weekly Schedule
 * Script untuk auto-generate weekly schedule dari menu items yang ada
 *
 * Usage: node seed-weekly-schedule.js [TOKEN]
 * Example: node seed-weekly-schedule.js eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 */

const axios = require('axios');

const backendUrl = 'http://localhost:5000/api';

async function seedWeeklySchedule(token) {
    try {
        console.log('🔄 Fetching menu items...');

        // 1. Get all menu items
        const menuRes = await axios.get(`${backendUrl}/menu`);
        const menus = menuRes.data;

        console.log(`✅ Found ${menus.length} menu items`);

        if (menus.length === 0) {
            console.log('❌ No menu items found. Please add menu items first.');
            return;
        }

        // 2. Build weekly schedule
        const days = ['senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu'];
        const menuSchedules = [];

        menus.forEach(menu => {
            const dailyQuotas = [];

            // Set quota 20 untuk setiap hari (bisa disesuaikan)
            days.forEach(hari => {
                dailyQuotas.push({
                    hari: hari,
                    quotaHarian: 20  // Default quota
                });
            });

            menuSchedules.push({
                menuId: menu._id,
                dailyQuotas: dailyQuotas
            });
        });

        console.log(`📅 Setting weekly schedule for ${menuSchedules.length} menus...`);

        // 3. POST to backend
        const scheduleRes = await axios.post(
            `${backendUrl}/jadwal/mingguan`,
            { menuSchedules },
            { headers: { 'x-auth-token': token } }
        );

        console.log('✅ Weekly schedule set successfully!');
        console.log(`📆 Week Range: ${scheduleRes.data.weekRange}`);
        console.log(`📋 Updated ${scheduleRes.data.updatedMenus.length} menus`);

    } catch (error) {
        console.error('❌ Error:', error.response?.data?.message || error.message);
    }
}

// Check if token provided
const token = process.argv[2];

if (!token) {
    console.log('❌ No token provided!');
    console.log('');
    console.log('Usage: node seed-weekly-schedule.js [TOKEN]');
    console.log('');
    console.log('How to get token:');
    console.log('1. Open test-weekly.html');
    console.log('2. Login via Google OAuth');
    console.log('3. Open browser console (F12)');
    console.log('4. Type: localStorage.getItem("appToken")');
    console.log('5. Copy the token and run:');
    console.log('   node seed-weekly-schedule.js YOUR_TOKEN_HERE');
    process.exit(1);
}

seedWeeklySchedule(token);
