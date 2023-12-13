export default function PostCardSkeleton() {
  return (
    <div className='card'>
      <div className='card-body'>
        <h5 className='card-title skeleton h-16'></h5>
        <p className='card-text skeleton h-6'></p>
        <div className='carousel relative w-full skeleton h-96'></div>
      </div>
    </div>
  );
}
