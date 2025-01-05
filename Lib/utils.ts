export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' }
    return date.toLocaleDateString('en-US', options);
}

export const formatTime = (minutes: number) => {
    const diffInHours = Math.floor(minutes / 60);
    
    if (minutes < 60) {
        return `${minutes}min`;
    } else {
        const remainingMinutes = minutes % 60;
        return `${diffInHours}h ${remainingMinutes}min`;
    }
}