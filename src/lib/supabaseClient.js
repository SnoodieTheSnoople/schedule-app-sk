import { createClient } from '@supabase/supabase-js';

export const supabase = createClient('https://mqrkpnsjkvbjecpdazvf.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xcmtwbnNqa3ZiamVjcGRhenZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA3ODM4MTksImV4cCI6MjAxNjM1OTgxOX0.2dn0eA8DH6T7R7zihB4sbMl501fvsI94ZK2EVjCfdrc');

